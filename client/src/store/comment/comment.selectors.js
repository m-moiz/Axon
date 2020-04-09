import { createSelector } from 'reselect';

const selectComment = (state) => state.comment;

export const selectComments = ([ selectComment ], (comment) => comment.comments);
