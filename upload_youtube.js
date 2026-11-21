const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function uploadShort() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YT_CLIENT_ID,
    process.env.YT_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.YT_REFRESH_TOKEN,
  });

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  const mp4File = fs.readdirSync(__dirname).find((f) => f.endsWith('.mp4'));
  if (!mp4File) {
    console.error('❌ Koi MP4 video nahi mili!');
    process.exit(1);
  }

  const playerName = process.env.PLAYER_NAME || 'Cricket';
  const team1 = process.env.TEAM_1 || '';
  const team2 = process.env.TEAM_2 || '';

  const res = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: `${playerName} ${team1} vs ${team2} Next Score #Shorts`,
        description: `${playerName} score pattern & prediction #Shorts #Cricket`,
        tags: ['shorts', 'cricket', playerName],
        categoryId: '17',
      },
      status: {
        privacyStatus: 'unlisted', // baad mein khud sound laga kar public kar sakta hai
        selfDeclaredMadeForKids: false,
      },
    },
    media: {
      body: fs.createReadStream(path.join(__dirname, mp4File)),
    },
  });

  console.log('✅ YouTube par upload ho gaya! Video ID:', res.data.id);
}

uploadShort();
