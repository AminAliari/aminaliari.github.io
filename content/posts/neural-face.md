---
title: "Eurographics 2023 Publication"
date: 2023-05-07T10:00:00
cover:
   image: "/images/neural-face/header.png"
   relative: false
   caption: "Face Editing Using Part‑Based Optimization of the Latent Space"
draft: false
tags: [Computer Graphics, Eurographics, Deep Neural Networks]
---
<div align='center'>
    <a href='http://dx.doi.org/10.1111/cgf.14760' target='_blank'><img loading="lazy" src="https://img.shields.io/badge/Paper-nueral--face-blue" alt="Paper" /></a>
</div>

My latest work _**Face Editing Using Part‑Based Optimization of the Latent Space**_ has just been released! We submitted this paper to **Eurographics 2023**, and it has been published in **Computer Graphics Forum** journal **(Volume 42, Issue 2)**. In fact, this is my first publication ever.
Therefore, and naturally, writing for the first time was very challenging for me, especially since I was a master's student.
However, I should mention that this work was done with some amazing collaborators that made my job much easier. Namely, my supervisors: **Prof. Eric Paquette** and **Prof. Tiberiu Popa**, and the incredible people from **Ubisoft La Forge**.
Please go ahead and check out [the article.](http://dx.doi.org/10.1111/cgf.14760) Also, if you happen to be in **Saarbrücken, Germany**, around **May 8 – 12, 2023**, you can attend [our presentation](https://eg2023.saarland-informatics-campus.de/full-program/#fp3-10-1).
We will be more than happy to meet you!

# Abstract
> We propose an approach for interactive 3D face editing based on deep generative models. Most of the current face modeling methods rely on linear methods and cannot express complex and non-linear deformations. In contrast to 3D morphable face models based on Principal Component Analysis (PCA), we introduce a novel architecture based on variational autoencoders. Our architecture has multiple encoders (one for each part of the face, such as the nose and mouth) which feed a single decoder. As a result, each sub-vector of the latent vector represents one part. We train our model with a novel loss function that further disentangles the space based on different parts of the face. The output of the network is a whole 3D face. Hence, unlike partbased PCA methods, our model learns to merge the parts intrinsically and does not require an additional merging process. To achieve interactive face modeling, we optimize for the latent variables given vertex positional constraints provided by a user. To avoid unwanted global changes elsewhere on the face, we only optimize the subset of the latent vector that corresponds to the part of the face being modified. Our editing optimization converges in less than a second. Our results show that the proposed approach supports a broader range of editing constraints and generates more realistic 3D faces.

**Authors:** Mohammad Amin Aliari, Andre Beauchamp, Tiberiu Popa, Eric Paquette

**Publisher:** Computer Graphics Forum (2023). The Eurographics Association and John Wiley & Sons Ltd., 2023

# Reference
Please cite [this paper](http://dx.doi.org/10.1111/cgf.14760) if you use this code in your own work. Please also let [us](mailto:eric.paquette@etsmtl.ca) know.
```
@article{https://doi.org/10.1111/cgf.14760,
author = {Aliari, Mohammad Amin and Beauchamp, Andre and Popa, Tiberiu and Paquette, Eric},
title = {Face Editing Using Part-Based Optimization of the Latent Space},
journal = {Computer Graphics Forum},
volume = {42},
number = {2},
pages = {269-279},
keywords = {CCS Concepts, • Computing methodologies → Mesh models, Neural networks},
doi = {https://doi.org/10.1111/cgf.14760},
url = {https://onlinelibrary.wiley.com/doi/abs/10.1111/cgf.14760},
eprint = {https://onlinelibrary.wiley.com/doi/pdf/10.1111/cgf.14760},
year = {2023}
}

```

# Acknowledement
I want to acknowledge the great support and collaboration of our industry partners: Ubisoft and Mitacs.
They funded this research and provided me with the opportunity to work on real-world problems with state-of-the-art technologies, tools, and resources.
I am immensely grateful to the research team at Ubisoft. Namingly, Olivier Pomarez, Andre Beauchamp, and Abdallah Dib.
They were very helpful and friendly and shared their expertise and insights with me.
They also created an enjoyable research environment where I learned a lot and had fun.

# Source Code
Coming soon!
