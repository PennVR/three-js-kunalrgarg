# three-js-kunalrgarg (Park Fireworks)

# Information
Name: Kunal Garg
Project Name: Park Fireworks (PennVR Three.js project)
GitHub Pages Site: https://pennvr.github.io/three-js-kunalrgarg/

# Techniques: 
Using perlin noise, I was able to generate a randomly elevated terrain. This smooth random surface allowed me to give the user an impression of being on a hilly surface. I used this technique because it is the most straightforward and commonly used noise function. I used basic geometry position moevement to manually move the fireworks every frame. I used this strategy as I did not know how to use force/velocity to move the fireworks.

# Instructions on building/running the code: 
I started my project by using the class demonstration of https://github.com/PennVR/PennVR-Head-Gazer. I then proceeded to add the perlin noise function to the y value for each vetex of the floor plane. Finally, I added an array of clouds, a sun, and an array of fireworks that would move vertically until a certain elevation and created children sparks, that would fall back down, at that set value.

To view the VR experience, clone the projet and open the index.html file in firefox nightly. Or you can open the GitHub Pages site on chromium/firefox nightly.

# Motion Sickness: 
While I did not feel a sense of motion sickness while in the VR experience for a short period of time. My friend felt motion sickness after wearing the oculus for an extended period of time. I am assuming a lower frame rate than 60 fps caused the sesnse of motion sickness as there was a disconnect between sight and the corresponding scene. 

# Assignment's Most Difficult task: 
I felt that getting started and aquainting myself with javascript, threejs documentation, and even git was probably the most difficult task. I spent a majority of the time leanring the tools avaiable to me rather than applying them towards the project.

# What I wish I had done differently: 
I wish I had started earlier and worked towards a velocity/force based firework. I also wish I had cleaned the project by moving the fireworks functions to another class, and created more defined clouds.

# What I was different about the assignemnt: 
I wish the directions were a little more clear as to what would earn me minimum points and what would earn me full credit. Additionally I wish we worked through more examples in class closer to when we were assigned the project. Trung's walkthrough really helped me understand basics, and I wish we had another example. Overall I felt that there was a huge learning curve, but I feel that I learned a lot in the process and am glad that I got to complete the assignment.

