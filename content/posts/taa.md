---
title: "Adding Temporal Anti-Aliasing and God Rays to Mithra"
date: 2021-05-09T10:00:00
cover:
   image: "/images/taa/header.png"
   relative: false
   caption: "[Bunny model by maxpanysh](https://sketchfab.com/3d-models/silent-ash-bc44272e8c1047148b33c913e659fcfa)"
draft: false
series: [Mithra]
tags: [Computer Graphics, TAA, God Rays, Blue Noise]
---


I wanted to implement a proper anti-aliasing method for Mithra.
There are different sources of aliasing. For instance, we have the classic jagged edges of triangles and other things such as [specular ailising](https://www.shadertoy.com/view/WssyR7), which must be addressed, especially in a PBR setup.

Anyways, I decided to implement UE4's TAA method, which was [introduced](https://advances.realtimerendering.com/s2014/index.html#_HIGH-QUALITY_TEMPORAL_SUPERSAMPLING) by Brian Karis a couple of years ago.

# God Rays
When we implement TAA, we can see that the output converges in a couple of frames, and the edges would mostly look smooth and close to a super-sampled image.
However, another valuable property of temporal techniques is that we can use them to achieve certain effects without spending a lot of the budget on them.
In order to try this, I decided to implement God Rays in Mithra. The result is shown in the header of this post.
I used a very low number of steps for ray-marching. As you can see, the output looked very noisy when TAA was turned off.

{{< figure src="/images/taa/noisy.png" title="" >}}

#

However, when TAA is on, the accumulated result would look much better at such a low cost.

{{< figure src="/images/taa/fixed.png" title="" >}}

# Blue Noise
I should mention that when I was using a standard random number generator, I could see some patterns, and TAA was not as effective as it could be.
So I took inspiration from [this awesome blog](https://blog.demofox.org/2020/05/16/using-blue-noise-for-raytraced-soft-shadows) and used blue noise and golden ratio to hide the visible patterns. 

{{< figure align=center src="/images/taa/blue-noise.png" title="Blue Noise" >}}