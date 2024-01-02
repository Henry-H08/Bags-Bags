

// Load a shader with custom fragment shader code
// The fragment shader should define a function "frag", which returns a color and receives the vertex position, texture coodinate, vertex color, and texture as arguments
// There's also the def_frag() function which returns the default fragment color
loadShader("pixelate", null, `
uniform float u_size;
uniform vec2 u_resolution;

// TODO: this is causing some extra pixels to appear at screen edge
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	if (u_size <= 0.0) return def_frag();
	vec2 nsize = vec2(u_size / u_resolution.x, u_size / u_resolution.y);
	float x = floor(uv.x / nsize.x + 0.5);
	float y = floor(uv.y / nsize.y + 0.5);
	vec4 c = texture2D(tex, vec2(x, y) * nsize);
	return c * color;
}

`)

var beanpixel = 4

add([
	sprite("apple"),
	pos(80, 40),
	scale(8),
	// Use the shader with shader() component and pass uniforms
	shader("pixelate", () => ({
		"u_resolution": vec2(width(), height()),
		"u_size": beanpixel
	})),
])

add([
	sprite("apple"),
	pos(center()),
	scale(8),
	area(),
	'ghosty'
	
])

onClick("ghosty", (ghosty) => {
	beanpixel = 0
	
})
