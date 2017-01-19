module.exports = {
    tasks: {
        build: [
            "clean",
            "webpack"
        ],
        clean: [
            "@sh rm -rf ./js/dist",
            "@sh rm -rf ./css/dist",
            "my-task.js" // <--- just provide the path
        ],
        webpack: "@npm webpack"
    }
};