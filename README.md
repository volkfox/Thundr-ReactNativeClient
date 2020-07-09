

# This is the Client implementation. See https://github.com/volkfox/ThundrWeb for more app details.

  Thundr Brainstorming App client (React Native)

# Purpose

  Democratize d-thinking and brainstorming.

# Target platform

  This app uses camera, so not recommended on simulator.
  It works on the ipad, but is mainly designed for iphones.
 
# Architecture

  Thundr conists of the web app and a mobile client.
  To start the webapp, open https://thundrweb.herokuapp.com
  Clicking on "cloud" image creates a new empty brainstorm.
  To check out an existing brainstorm, try https://thundrweb.herokuapp.com/session/MPUZKX

  Brainstorm session is a shared-group webscreen managed by discussion moderator.
  Anyone who knows the session code (shown in the right corner) can join the session with their mobile app.
  There are also several brainstorm channels within the session switched in tabs of the webapp.

  * Note that free hosting tier can be slow to start and may sleep agressively
    If webscreen stops updating, reload the webpage to wake up heroku

# Main features

  Mobile app has three main tasks: (1) join the brainstorm, (2) submit ideas and (3) vote on ideas.

  (1)
  To join the brainstorm, a user can do one of the four things from the 1st mobile screen:

  a. Type the code shown in webapp (right corner)
  b. Click on QR icon and point camera to QR code on webscreen to scan (tap anywhere to cancel)
  c. Open the app using system IOS camera QR scanner
  d. Use system IOS camera to update app running in background with a new brainstorm code

  (2)
  Once the session is opened in Thund mobile app, user can submit ideas.
  Ideas are submitted by either typing in "post-it" note, or dictating (via automatic transcription).
 
  (3)
  App can be switched into "voting mode" only by moderator of webscreen.
  Clicking on "thumbs up" icon in left upper corner of webscreen forces mobile clients into voting mode.
 
  In voting mode, mobile client is presented with a list of all ideas and can vote on them.
  Votes are collected in webapp. Voting ends when the moderator clicks "thumb up" button again.

  Note that mobile client is designed to be managed by webapp moderator on purpose to facilitate group discussion.
  Mobile client cannot go in and out of voting mode on its own.

# Featurettes 
  
  




.
