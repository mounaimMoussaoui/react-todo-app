module.exports = {
    jest: {
        configure: {
            transformIgnorePatterns: [
                "node_modules/(?!react-router|react-router-dom)"
            ]
        }
    }
};
