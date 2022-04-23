const config = {
    globals: {
        __DEV__: true
    },
    transformIgnorePatterns: [
        "node_modules/(?!(@react-native|react-native))"
    ],
    preset: "react-native"
};

module.exports = config;