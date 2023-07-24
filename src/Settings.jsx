
const Settings = () => {
  return (
    <div className="parent">

      <h1>Settings</h1>

      <div className="settingscont">

        <h2>PERSONAL SETTINGS</h2>

        <div className="sc1">
          <h4>Personal Information</h4>
          <div className="sca"><label>First Name:</label><input placeholder="First Name" /></div>
          <div className="sca"><label>Last Name:</label><input placeholder="Last Name" /></div>
          <div className="sca"><label>Phone No:</label><input placeholder="Phone no" /></div>
          <div className="sca"><label>Country:</label><input placeholder="Country" /></div>
        </div>

        <h2>PRIVACY SETTINGS</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          <div className="sc1">
            <h4>Change your Profile Picture</h4>
            <div className="sca"><input placeholder="url" type='file' /></div>
          </div>

          <div className="sc1">
            <h4>Change your password</h4>
            <div className="sca"><label>Confirm Password:</label> <input placeholder="Password" /></div>
            <div className="sca"><label>New Password:</label> <input placeholder="New Password" /></div>
            <div className="sca"><label>Confirm New Password:</label> <input placeholder=" Confirm New Password" /></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings