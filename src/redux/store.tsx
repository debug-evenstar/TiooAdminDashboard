import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

const store: ToolkitStore = configureStore({
    reducer: {
    }
});

export default store;