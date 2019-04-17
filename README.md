# QA Interview Integration Tests

You are allowed to use any test framework of your choice.

## Upload a file in bulk list

-   Ensure tthat the logged in user has sufficient permission to visit the builk file upload page and has the ability to upload.
-   Form upload should only accept from the accepted file list (.txt, .xlsx, .csv).
-   Each file should be tied to one action.
-   After a successful upload, the file list should reflect the newly uploaded file

## Testing authorization of user roles andd groups

-   Given a user acc with permissin to create a reward and ensure that the user is not able to visit the rest of the page sections (loyalties, campaigns, merchants, user lists, bulk actions)

## Creating a reward

-   Ensure that a logged in user has sufficient permission to create a reward.
-   A non-authorized should not have access to the reward detail/edit page if he tries to access directly from the URL.
-   Clicking "+ Create New" button should lead to reward creation page
-   Reward form
    -   A reward validity period should have both start and end dates.
    -   A successful submission only happens when the payload contains all mandatory information.
    -   It should not show up in the rewards listing.
-   Disabling a section should clear respective information from the form payload
-   If the reward is of private type,
    -   All fields related to catalogues, labels, brands, tags and categories should disappaer.
    -   It should not be tagged to any catalogues, labels, brands, tags nor categories.
