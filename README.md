# sc-code

## React

### Task 1

Environment:
* node v14.18.1
* yarn 1.22.17

Path `react/phone-book`

Start application `yarn start` or create a production build and serve build directory

Execute tests `yarn test:nowatch`

### Task 2
```typescript
...
const [position, setPosition] = useState<MousePositionType>({ x: 0, y: 0 });
const [windowSize, setWindowSize] = useState<WindowSizeType>({
  height: 0,
  width: 0,
});
let [distance, setDistance] = useState(0);
const { distanceCalculator } = mathLib();
```
This creates a new distanceCalculator function on every single render. This is a static function and can be moved out of the component function.


```typescript
...
const handleMouseMove = (e: { clientX: number; clientY: number }) => setPosition({ x: e.clientX, y: e.clientY });
const handleResize = () => setWindowSize({ height: window.innerHeight, width: window.innerWidth });
```
New functions are defined on every render. With useCallback and an empty dependency array this can be avoided.

```typescript
useEffect(() => {
  setDistance(
    distanceCalculator(position, {
      x: windowSize.width / 2,
      y: windowSize.height / 2,
    })
  );
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);
}, [position, windowSize.width, windowSize.height]);
```
The effect must return a callback function where the listeners are deregistered. Otherwise new listeners will be registered each time useEffect is called. This leads to performance and memory problems.

Example
```typescript
useEffect(() => {
    ...
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
    };

}, [position, windowSize.width, windowSize.height]);
```
