import "./App.css";
import { GradientShapeStudio } from "./GradientStudio";
import { GradientStudioProvider } from "./providers";

function App() {
  return (
    <GradientStudioProvider>
      <GradientShapeStudio />
    </GradientStudioProvider>
  );
}

export default App;
