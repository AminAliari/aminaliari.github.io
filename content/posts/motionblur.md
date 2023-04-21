---
title: "Optimizing a Motion Blur Effect"
date: 2020-10-25T10:00:00
cover:
   image: "posts/motionblur/images/final.png"
   relative: true
   caption: "Photo: The Last of Us Part II"
draft: false
tags: [Computer Graphics, Rendering, Motion Blur, Optimization, Velocity Buffer]
---


Recently, I explored different Motion Blur techniques being used in the video game industry. Now, I have decided to jot down the result of this research.

At the first glance, I found several per-pixel motion blur approaches, but they did not impress me. To explain why I was not satisfied with the results, some history lessons are required!

# Screen-space Motion Blur
My main issue with the trivial approaches was that they would only take the camera motion into account. The problem with this approach is that the movement of the object would not make a discernible motion trail. Basically, in motion blur effects based on the camera's position and orientation, one rendering pass would be dedicated to finding the difference of pixels' position between the current frame and the previous one. The result of this render pass is stored in a render target, commonly, called Screen velocity vectors.

# A better approach
As I was continuing my research, one method particularly caught my eye. It was called *A Reconstruction Filter for Plausible Motion Blur* by Prof. Morgan McGuire.

Let's first see how this method works:

1. Render the scene

2. Store the depth buffer. This is needed at the filter stage to preserve the sharpness of the edges.

{{< figure src="images/gbuffer.png" title="" >}}

#

3. Create the velocity buffer based on current and the previous objects world matrices, and store it as half-vectors.

{{< figure src="images/velocity-buffer.png" title="" >}}

#

4. Divide the velocity buffer into KxK tiles which will generate a [Width/K]x[Height/K] buffer.

#

5. Find the greatest velocity vector in each tile based on its length.

{{< figure src="images/velocity-max.png" title="" >}}

#

6. Find the greatest velocity vector between all neighbors of each tile.

{{< figure src="images/tile-max.png" title="" >}}

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
- Early out when there is no movement going on in the radius of that pixel

If you want to learn more about this method, you can read the paper down below in the references. Also, I need to mention that although there are many improvements that this method introduces, there exist more sophisticated and state-of-the-art solutions being used in the AAA games. There are many great GDC and SIGGRAPH talks on this topic, so I am sure you can find them yourself

####

# An optimized implementation
Alright, enough with the introductions; now, it is time to talk about what I was able to do!

First of all, if this approach is considered to be a good one then what is the problem? Well, even though today's GPUs are way more competent than the ones back when this paper was first published (2012), it is always a good idea to find the optimum solution; especially when there is room for optimization.
So here is what I did to implement an optimized version of this method:

1. Memory bandwidth is scarce, so we do not want to store all of our history buffers into render targets. Therefore, we want to reduce GBuffer size, and, consequently, reduce the memory bandwidth usage. One Idea is to store the previous frame's depth instead of position. This saves us some bytes as we can reconstruct the last frame's position from the depth buffer and previous camera matrix.

#

2. This whole approach is quite suitable for compute shaders. Yet, you may ask what advantages it has over our normal fragment/pixel shaders. Well, an architectural advantage of compute shaders for image processing is that they skip the ROP step.

#

3. To further optimize this method, we have to pay heed to our memory access pattern. In the *Neighbor pass* where we find the most dominant velocity vector between the neighbors, we are essentially accessing 8 neighbors, but these tiles share a lot of neighbors. As a result, should we cache the result of our texture fetch in shared memories for each local thread group, we can avoid the extra costly texture fetches in the future.

# Conclusion
Alright, finally, it is time to show some numbers. I implemented this project using The Forge rendering framework, and then ran it on an NVIDIA GTX 970. The results were as follow:

{{< figure src="images/result.png" title="" >}}

# Disclaimer
I wrote this article solely for educational purposes; therefore, I would not be surprised if I made a bunch of severe errors. In that case, I will be more than honored to be enlightened. For that, please use one of the contact methods provided on the Homepage. Thank you!

####

# References
1. McGuire M., Hennessy P., Bukowski M., Osman B.: [A reconstruction filter for plausible motion blur](https://casual-effects.com/research/McGuire2012Blur/McGuire12Blur.pdf). In *Proc. ACM i3D* (2012), pp. 135– 42. 2, 8
2. Chapman J.: [Per-Object Motion Blur](http://john-chapman-graphics.blogspot.com/2013/01/per-object-motion-blur.html)
3. The Forge - [Github](https://github.com/ConfettiFX/The-Forge)