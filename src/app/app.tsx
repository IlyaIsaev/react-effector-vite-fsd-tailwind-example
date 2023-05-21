import { memo } from "react";

export interface AppProps {}

export const App = memo<AppProps>(() => <div>App</div>);

App.displayName = "App";
