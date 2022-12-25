
exports.isIssueCreator = (currentUserId, issueCreatorUserId) => {
    return currentUserId === issueCreatorUserId;
};

