/**
 *
 * This function checkBody will evaluate if body from
 * post route is empty or not
 *
 * @param body - is an object type parameter
 * @param keys - are objectKeys from body
 *
 * @returns boolean
 *
 */
function checkBody(body, keys) {
   let isValid = true;

   for (const field of keys) {
      if (!body[field] || body[field] === "") {
         isValid = false;
      }
   }

   return isValid;
}

module.exports = { checkBody };
