---
title: "Mithra Graphics Renderer"
date: 2020-07-01T10:00:00
cover:
    image: "posts/mithra/images/sphere.png"
draft: false
tags: [Computer Graphics, Rendering, Physically-based Rendering, OpenGL, C++, Image-based Lighting]
series: [Mithra]
---

"Mithra" is a physically-based graphics renderer featuring many new and modern rendering techniques such as image-based lighting, shadow-mapping, etc.
I have also proposed and defended this renderer as my B.Sc. project at Amirkabir University of Technology (Tehran Polytechnic).

####

This is a showcase of some of its main features. Hopefully, in near future, I will share more about the development process in this blog.‍

####

{{< gallery-slider dir="/mithra/images/" width="700px" height="350px" arrow-left="fa-chevron-left" arrow-right="fa-chevron-right" auto-slide="2000">}}

# Features
 - Physically-based pipeline
 - Cook-Torrance BRDF
 - HDR
 - Directional Lights
 - Point lights
 - Shadow mapping
 - Diffuse irradiance
 - Specular IBL (image-based lighting)
 - Editor
 - Mesh importer, supporting: glTF, fbx, obj
 - Basic world editor, and component property viewer

# Editor Features
 - Live performance profiler
 - Debug modes to see normals, ambient, metalness, roughness, etc.
 - Shaders hot reloading
 - Scene graph
 - Property viewer to move around object, manipulate lighting or environment settings
 - Live texture viewer in memory (gpu vram) to debug each rendering pass
 - Buffers list viewer

# Roadmap
 - Bindless texture
 - Batching draw calls
 - Texture Atlas
 - SSAO
 - Bloom
 - TAA
 - More advanced shadow techniques such as moment shadow maps
 - Local illumination with spherical harmonics and spherical gussians
 - Displacement maps
 - Clear coats
 - Blending different BRDFs
 - Screen space reflection
 - Clustered forward rendering

# Technologies
- C++17
- OpenGL
- GLSL
- GLFW
- GLEW
- Assimp
- stb_image
- Premake build system

####

> Note: all assets used are from Skecthfab free plan.