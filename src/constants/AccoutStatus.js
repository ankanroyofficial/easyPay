import images from "./images";

export const accountStatus = (val) => {
    try {
        switch (val) {
            case "not_verified": return ["NOT VERIFIED", images.notverifyAcc];
            case "pending": return ["PENDING", images.pendingacc];
            case "accepted": return ["ACCEPTED", images.verifyacc];
            case "rejected": return ["REJECTED", images.rejectacc];
            default: return ["ERROR", images.notverifyAcc];
        }
    } catch (error) {
        console.log("accountStatus", error)
    }
}