// import mongoose from 'mongoose';

// const NotificationSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   body: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Notification = mongoose.model('Notification', NotificationSchema);

// export default Notification;
// import mongoose from "mongoose"

// const notificationSchema = new mongoose.Schema({
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Notification', notificationSchema);



// import mongoose from 'mongoose';
// const notificationSchema = new mongoose.Schema({
//   message: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// // module.exports = mongoose.model('Notification', notificationSchema);

// // export default Notification;
// module.exports = Notification;





// import mongoose from 'mongoose';

// const notificationSchema = new mongoose.Schema({
//   message: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const Notification = mongoose.model('Notification', notificationSchema);
// export default Notification;








// // models/Notification.js
// import mongoose from 'mongoose';

// const notificationSchema = new mongoose.Schema({
//   message: String,
//   read: {
//     type: Boolean,
//     default: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // module.exports = mongoose.model('Notification', notificationSchema);
// // export default Notification;



// const Notification = mongoose.model('Notification', notificationSchema);

// export default Notification;



// import mongoose from 'mongoose';

// const notificationSchema = new mongoose.Schema({
//   message: { type: String, required: true },
//   read: { type: Boolean, default: false }, // important!
//   createdAt: { type: Date, default: Date.now },
// });

// const Notification = mongoose.model('Notification', notificationSchema);
// export default Notification;






import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// 👇 Use ESM export instead of CommonJS
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
