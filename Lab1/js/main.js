function sinusoid( u, v, target ) {
    u *= 4 * Math.PI;
    v *= 2 * Math.PI;

    let n = 5, a = 1, b = v;
    let r = u, R = n * Math.PI / 2;
    let x, y, z;

    x = r * Math.cos(b);
    y = r * Math.sin(b);
    z = a * Math.cos(n * Math.PI * r / R);

    target.set( x, y, z );
}

function rotateObject(object) {
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;
}

function animation(scene, renderer, camera, controls, ...objects) {
    const animate = function () {
        requestAnimationFrame( animate );

        objects.forEach(object => rotateObject(object));
        controls.update();

        renderer.render( scene, camera );
    };
    return animate;
}

function setupRenderer(renderer) {
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( colors.ground );
    document.body.appendChild( renderer.domElement );
}

function setupLight(scene) {
    let colorLight = new THREE.HemisphereLight(colors.light, colors.dark, 1);
    scene.add(colorLight);
}

function createObject(geometry) {
    let material = new THREE.MeshPhongMaterial({color: colors.sky});
    return new THREE.Mesh(geometry, material);
}

function createWireframe(geometry) {
    let line = new THREE.LineSegments( geometry );
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;

    return line;
}

function setup() {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer();
    let controls = new OrbitControls( camera, renderer.domElement );

    setupRenderer(renderer);
    setupLight(scene);

    let geometry = new THREE.ParametricGeometry( sinusoid, 25, 25 );
    let object = createObject(geometry);
    let wireframe = createWireframe(geometry);
    scene.add(object);
    scene.add(wireframe);

    animation(scene, renderer, camera, object, wireframe)();

    camera.position.z = 25;
    controls.update();
}

const colors = {
    sky: 0x70D6FF,
    light: 0xFFF9EB,
    dark: 0x8F5FD3,
    ground: 0xAB4E68,
    figure: 0xFF9770,
}

setup();
