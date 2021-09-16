import * as post_service from "./post.service"
// @ponicode
describe("post_service.createNewPost", () => {
    test("0", async () => {
        await post_service.createNewPost({})
    })
})
