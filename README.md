# Starry Sky
------

### Conceptual Description
Stars and constellations are constant and trustworthy regardless from where a person is located throughout the world.  In my life, practicing art has been with me since childhood, and I anticipate continuing to involve art in my life in my future career and hobbies as well.  I thought using the night sky would be a fitting theme to present my final project this semester.  When I was considering ideas for my final project, I wanted to create something that brought together several different lessons from throughout the semester.  I was very intrigued by the idea of incorporating human interaction into my piece.  My project involves a face tracking library that takes in the positions of different points on a recognized face.  It then projects these points as twinkling stars into the sky, creating a vision of a face constellation in the sky.  I find a sense of peace in the simplicity and calm motion represented, similar to the feeling of relaxing and star gazing.


### Interactive Description
My piece is very user-friendly.  Ideally, it would be set up on a very large screen to make the viewer feel enveloped into the night sky.  There must be a camera that can focus on the viewer's face and pick up details.  Users can wiggle their faces and move around in front of the camera, and the locations of the stars will be reflected on the screen.  My piece should make any viewer feel relaxed which is accomplished through the smooth flow of the stars and the resemblance to a beautiful, clear night sky.

### Drawing
![Sketch](assets/sketch.JPG?raw=true "Sketch")


### Technical Details
This project mainly utilizes p5.js to create the canvas and drawings.  I chose to use this library because I wanted to be able to incorporate a elements from different units throughout the semester.  I used scenemanager.js to switch from the title page to project canvas.  The Scene Manager library allows for multiple different pages within one code file.  Within each subgroup in the code, there are separate setup() and draw() functions for each slide.  The moving stars are created with a "Star" class.  I used clmtrackr.js to track the positions of points on the viewer's face.  I then indexed the positions and turned them into twinkling stars.  My project is hosted through GitHub Pages.

[Here's a link to the piece](https://cydayton.github.io/final/)
