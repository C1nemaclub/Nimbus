function getIANATimezone(utcOffsetSeconds) {
  const utcOffsetHours = Math.abs(utcOffsetSeconds / 3600);
  const sign = utcOffsetSeconds < 0 ? '+' : '-';
  return `Etc/GMT${sign}${utcOffsetHours}`;
}

function formatLocalTime(utcOffsetSeconds) {
  const timeZone = getIANATimezone(utcOffsetSeconds);
  return new Date().toLocaleTimeString('en-US', { timeZone });
}

/*
  console.log('UTC Offset(s)\tLocal time');
  for (let utcOffset of utcOffsets) {
    console.log(utcOffset + '', '\t\t', formatLocalTime(utcOffset));
  }*/

module.exports = formatLocalTime;
