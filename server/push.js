const fs = require('fs');

const vapid = require('./vapid.json');
const urlSafeBase64 = require('urlsafe-base64');
const subscriptions = require('./subs-db.json');
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:rluna.arkus@gmail.com',
  vapid.publicKey,
  vapid.privateKey
);

module.exports.getKey = () => {
  return urlSafeBase64.decode( vapid.publicKey );
}

module.exports.addSubscription = (subscription) => {
  subscriptions.push(subscription);
  // console.log(subscriptions);
  fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(subscriptions));
}

module.exports.sendPush = (post) => {
  subscriptions.forEach( (sub, i) => {
    webpush.sendNotification(
      sub,
      post.title
    );
  })
}