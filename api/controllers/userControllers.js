import { JSONFilePreset } from "lowdb/node";

// Setting up lowDb
const defaultData = { users: [] };
const db = await JSONFilePreset("../data/users.json", defaultData);

export const getAllUsers = (req, res) => {
  const users = db.data.users;
  if (!users) {
    res.status(404).json({ message: "users not found" });
  }
  res.status(200).json(users);
  //   console.log(users);
};

export const login = (req, res) => {
  const { email, password } = req.body;

  const foundUser = db.data.users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    res.status(200).json(foundUser); // returning the users data
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, age, eyeColor, password, company } =
    req.body;

  await db.update(({ users }) => {
    // Find the user to update by ID
    const user = users.find((u) => u._id === id);

    if (user) {
      // Update the user properties if they are provided
      if (name) {
        user.name.first = name.first || user.name.first;
        user.name.last = name.last || user.name.last;
      }
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      user.age = age || user.age;
      user.eyeColor = eyeColor || user.eyeColor;
      user.password = password || user.password;
      user.company = company || user.company;

      // Send the updated user back in the response
      return res.status(200).json(user);
    }

    // If the user wasn't found, send an error response
    return res.status(404).json({ message: "User not found" });
  });
};
