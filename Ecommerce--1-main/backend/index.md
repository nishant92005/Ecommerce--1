##### install mongoDB

```cmd
npm i mongoose;
```

###### db/config.js

```javascript (add url of mongoose)-
import mongoose from "mongoose";
connection - mongoose.connect("")
```

#### Registration -Schema and API

###### db/user.js

```javascript
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
export default mongoose.model("users", userSchema);
```

###### db/index.js

```javascript
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send({ message: "success", data: result });
});
```

##### handle cors issue-

```javascript
npm i cors
```

###### db/index.js

```javascript
app.use(cors());
```
