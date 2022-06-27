exports.generate = (err, code, message, data, records) => ({
  error: err,
  statusCode: code,
  message: message,
  records: records,
  data: data,
});
