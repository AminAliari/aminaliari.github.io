---
title: "Implementing and Optimizing a Motion Blur Effect"
date: 2020-10-25T10:00:00
cover:
   image: "/images/motionblur/final.png"
   relative: false
   caption: "Photo: The Last of Us Part II by Naughty Dog ©2019 Sony Interactive Entertainment."
draft: false
tags: [Computer Graphics, Rendering, Motion Blur, Optimization, Velocity Buffer]
---

# Source Code
First things first! You can get the code from the link below. Follow the instructions to download the Sponza art assets. 
[Source Code](https://github.com/AminAliari/motion-blur)

---

Recently, I was exploring different Motion Blur techniques being used in the industry. Now, I have decided to jot down the result of this research.

At first glance, I found several per-pixel motion blur approaches, but they did not impress me. To explain why I was not satisfied with the results, I need to give you some context!

# Screen-space Motion Blur
My main issue with the trivial approaches was that they would only take the camera motion into account. The problem with this approach is that the movement of the object would not make a discernible motion trail. Basically, in motion blur effects based on the camera's position and orientation, one rendering pass would be dedicated to finding the difference in pixels' position between the current frame and the previous one. The result of this render pass is stored in a render target, commonly called screen velocity vectors.

# A better approach
As I was continuing my research, one method particularly caught my eye. It was called *A Reconstruction Filter for Plausible Motion Blur* by [Prof. McGuire](https://casual-effects.com/research/McGuire2012Blur/index.html). I knew that this method is considered a bit old by now, but I also knew that it had proved its quality as it was used in many titles of its time.

Let's first see how this method works:

1. Render the scene

2. Store the depth buffer. This is needed at the filter stage to preserve the sharpness of the edges.

{{< figure src="/images/motionblur/gbuffer.png" title="" >}}

#

3. Create the velocity buffer based on the current and the previous objects' world matrices, and store it as half-vectors.

{{< figure src="/images/motionblur/velocity-buffer.png" title="" >}}

#

4. Divide the velocity buffer into KxK tiles resulting a [Width/K]x[Height/K] buffer.

#

5. Find the greatest velocity vector in each tile based on its length.

{{< figure src="/images/motionblur/velocity-max.png" title="" >}}

#

6. Find the greatest velocity vector between all neighbors of each tile.

{{< figure src="/images/motionblur/tile-max.png" title="" >}}

#

7. Apply the blur filters.

```
function reconstruct(X, C, V, Z, NeighborMax):
   // Largest velocity in the neighborhood
   Let ~vN = NeighborMax[bX/kc]   
   if ||~vN|| ≤ ε + 0.5px: return C[X] // No blur

   // Sample the current point
   weight = 1.0/||V[X]||; sum = C[X] · weight
   
   // Take S − 1 additional neighbor samples
   let j = random(−0.5, 0.5)
   for i ∈ [0, S), i 6= (S − 1)/2:
      // Choose evenly placed filter taps along ±~vN,
      // but jitter the whole filter to prevent ghosting
      t = mix (−1.0, 1.0,(i + j + 1.0)/(S + 1.0))
      let Y = bX + ~vN · t + 0.5pxc // round to nearest

      // Fore- vs. background classification of Y relative to X
      let f = softDepthCompare(Z[X], Z[Y])
      let b = softDepthCompare(Z[Y], Z[X])

      // Case 1: Blurry Y in front of any X
      αY = f · cone(Y, X, V[Y]) +

      // Case 2: Any Y behind blurry X;estimate background
      b · cone(X, Y, V[X]) +

      // Case 3: Simultaneously blurry X and Y
      cylinder(Y, X, V[Y]) · cylinder(X, Y, V[X]) · 2

      // Accumulate
      weight += αY ; sum += αY · C[Y]

   return sum/weight
```

# Benefits

There are several benefits that this method brings to the table.

- Parallelism and cache efficiency
- A line-gathering filter
- Needs only to search along NeighborMax.
- Compute NeighborMax with two m-way parallel-gather operations on n/k2
- The entire algorithm is O(kn/m)-time
- Exhibits both high memory locality and parallel memory access.
- Keeps the edges sharp while blurring the moving objects
- Early out, when there is no movement going on in the radius of that pixel

If you want to learn more about this method, you can read the paper below in the references. Also, I need to mention that although there are many improvements that this method introduces, there exist more sophisticated and state-of-the-art solutions being used in AAA games. There are many great GDC and SIGGRAPH talks on this topic, so I am sure you can find them yourself.

####

# An optimized implementation
Alright, enough with the introductions; now, it is time to talk about what I was able to do!

First of all, if this approach is considered to be a good one, then what is the problem? Well, even though today's GPUs are way more powerful than the ones when this paper was first published (2012), it could be a good idea to implement the method in a more optimized way.
So here is what I did to implement an optimized version of this method:

1. Memory bandwidth is scarce, so we do not want to store all of our history buffers into render targets. We want to reduce GBuffer size and, consequently, reduce memory bandwidth usage. One Idea is to store the previous frame's depth instead of position. This saves us some bytes as we can reconstruct the last frame's position from the depth buffer and previous camera matrix.

#

2. This whole approach is quite suitable for compute shaders. Yet, you may ask what advantages it has over our normal fragment/pixel shaders. Well, an architectural advantage of compute shaders for image processing is that they skip the ROP step. Also, the next point!

#

3. To further optimize this method, we have to pay heed to our memory access pattern. In the *Neighbor pass*, we want to find the most dominant velocity vector between the neighbors. We are essentially accessing 8 neighbors, but these tiles share some neighbors. As a result, should we store the result of our texture fetches in the group shared memory (also called LDS), we can avoid the extra costly samples in the subsequent calls.

# Conclusion
Alright, finally, it is time to show some numbers. I implemented this project using The Forge rendering framework and ran it on an NVIDIA GTX 970. The results were as follows:

{{< figure src="/images/motionblur/result.png" title="" >}}

#

**Do you see mistakes, typos, or have questions? Pleaes let me know!**

####

# References
- The Forge - [Github](https://github.com/ConfettiFX/The-Forge)
- Chapman J.: [Per-Object Motion Blur](http://john-chapman-graphics.blogspot.com/2013/01/per-object-motion-blur.html)
- McGuire, M., Hennessy, P., Bukowski, M., & Osman, B. (2012). [A Reconstruction Filter for Plausible Motion Blur](https://casual-effects.com/research/McGuire2012Blur/index.html). Proceedings of the ACM SIGGRAPH Symposium on Interactive 3D Graphics and Games 2012 (I3D’12).
- Sponza model authored by Frank Meinl at [Crytek](https://www.crytek.com).
- Sponza model acquired from [McGuire Computer Graphics Archive](https://casual-effects.com/data).
  
  