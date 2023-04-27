---
title: "Software Path Tracing on GPU"
date: 2023-04-15T10:00:00
cover:
   image: "/images/path-tracing/header.png"
   relative: false
   caption: "My Cornell(ish) Box!"
draft: false
tags: [Computer Graphics, Path Tracing, Atmospheric Scattering, Compute]
---

# Source Code
You can get the code from [here.](https://github.com/AminAliari/path-tracing)

---

Any graphics programmer would, at some point, take a look at the fantastic [Ray Tracing in One Weekend book](https://raytracing.github.io/books/RayTracingInOneWeekend.html) and get motivated enough to roll out their own version. So...I did the same!
However, mine took a little more than a "weekend" because I decided to implement it on GPU (DirectX 12, Vulkan) and also add features such as physically-based atmospheric scattering. Here are some figures:


{{< figure align=center src="/images/path-tracing/show.gif" title="My Whitted Ray Tracer" >}}

---

{{< figure align=center src="/images/path-tracing/infinite.png" title="Infinite bounces cause infinite reflections!" >}}

---

{{< figure align=center src="/images/path-tracing/env.gif" title=" Simulating the colors of the sky with atmospheric scattering" >}}

---

# Conclusion
To wrap this up, let's look at an issue I encountered while implementing the path tracer. Yeah, it was the good old `NaN` attacking the poor pixels. 😔
You know, we never start with shiny pixels...

{{< figure align=center src="/images/path-tracing/oops.gif" title="" >}}

---

# Future Work
- Using Monte Carlo.
- Supporting different BRDF models.
- Supporting triangle intersection.
- Using acceleration structures.
- Use Blue Noise in the random number generator.

# References
- [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html)
- [Coding Adventure: Ray Tracing](https://www.youtube.com/watch?v=Qz0KTGYJtUk&ab_channel=SebastianLague)
- [Simulating the Colors of the Sky](https://www.scratchapixel.com/lessons/procedural-generation-virtual-worlds/simulating-sky/simulating-colors-of-the-sky.html)
- [Casual Shadertoy Path Tracing 1: Basic Camera, Diffuse, Emissive](https://blog.demofox.org/2020/05/25casual-shadertoy-path-tracing-1-basic-camera-diffuse-emissive)
- *A Framework for the Experimental Comparison of Solar and Skydive Illumination*, Joseph T. Kider Jr et al., Cornell University 2014.
)
