<div style="display: flex; flex-direction: row; align-items: center; font-weight: bold; font-size: 20px;">
<img src="https://play-lh.googleusercontent.com/XzSEPdQ-905ZMIe2BcadNp2ohYXvt5SFqBT8UnGeIXSIUInSbbdppzSnAEDdsQnuELFk" alt="Q" style="width: 32px; border-radius: 50%;">Q-Dance Discord Bot
</div>

---

This is a Discord bot that can be used to get information about Q-Dance events and artists, and to play the Q-Dance Radio in a Voice Channel.

/!\ This version is not stable, code is messy and not optimized !
## Setup

! The bot uses Discord Voice, meaning that FFMPEG is required on the machine !

Install the dependecies using :
```sh
npm i
```

Setup the `.env` file (at the root of the folder) :
```
TOKEN="DISCORD_BOT_TOKEN"

QRADIO_REFRESH_INTERVAL=60000 # At which speed will the bot fetch the QRadio onAir endpoint
```

Then run the bot with :
```sh
npm start
# or
node src/index.js
```

---

If you encounter errors or have trouble to set it up, feel free to reach out on discord :
[@f2ville](https://discord.com/users/836685191812218970)