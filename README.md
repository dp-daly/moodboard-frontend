# ArtBoards

![](/assets/wholepage.png)

## Description

ArtBoards is a moodboard app that draws on the Art Institute for Chicago API to allow users to search for "art objects" relating to their search term. Results are rendered onto 'cards' which the user can then add to a moodboard. 

The user can have multiple moodboards with custom background images. They have the ability to create, edit, and delete the moodboard itself as well as adding and remove cards that appear on it.

## Getting started

### Access

You can access ArtBoards here:

### Functionality


The landing page allows an unauthorised user to use the react controlled form, which yields instant results - up to 8 per page - and can be browsed using the page controls. 

![](/assets/api-results.png)

The user is invited to register their account in the navbar at the top of the page. Once registered and/or signed in the user is able to create a board.

![](/assets/createaboard.png)

The user is redirected to the index page where they can begin to add cards to their moodboard. When the user clicks the 'plus' button on the card, a menu appears on the left hand side of the page asking them if they would like to add the card to a board. They have the option to close the menu and continue searching, or they can select a board to which they would like to add the card.

![](/assets/sidebar.png)

Once added to the board, the user remains on the index page to continue their search and continue assigning their chosen cards to boards.

When ready, the user can navigate to their board(s) using the navbar where they have the ability to further customise their board by adding an image URL to act as the board's background.

![](/assets/spaceboard.png)

## Accessibility

Images contain alt text or aria labels and high contrast colour pairings have been selected throughout.

The navbar is constant throughout the UI for simple navigation. Images and text are quite large, with a view to making access easy for all ages.

## Technology

### Stack
* Django
* PostgreSQL
* React 

### Languages
* Python (backend)
* Javascript (frontend)
* JSX
* CSS

### Select logic 

#### Sidebar logic

The appearance of the sidebar when a card is selected is controlled by a react state called 'sidebarVisible'. The handleSelectedArtwork() function is called when an artwork card add button is clicked. 

![](/assets/handleSelectedArtwork.png)

While its main function is to set the selectedArtwork state to the selected artwork, it also sets sidebarVisible to true, making the conditionally rendered sidebar visible.

![](/assets/sidebarVisible.png)

Moreover, the user must select a board to which they would like the card to be added. They are unable to select 'add to board' until this condition is met. This was achieved by disabling and activating the button using a ternary operator which toggled the CSS class on the button according to a predefined condition.

![](/assets/toggle%20buttonClass.png)

### Planning materials

Planning materials can be accessed here: https://trello.com/b/GlPM2RQs/moodboard

## Improvements

* Integrate ReactDnD to provide a more interactive experience in moodboard UI.
* Add community features, allowing users to view each others' moodboards.
* With this, include comment and favourite functionality. 

## Attributions

* The Art Institute of Chicago for its free and well-documented public API.