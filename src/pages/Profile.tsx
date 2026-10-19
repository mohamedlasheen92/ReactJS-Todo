

const Profile = () => {
  const dataStr = localStorage.getItem('loggedInUser');
  const userData = dataStr ? JSON.parse(dataStr) : null;
  const data = userData.user;

  return (
    <>
      <h3 className="text-8xl text-center text-white italic  w-fit mx-auto px-6 rounded-lg bg-amber-700 animate-bounce">Profile</h3>
      <div className="bg-amber-100 text-center rounded-b-lg p-10 font-bold text-indigo-700 mt-4">
        <h3>Username: {(data.username as string).toUpperCase()}</h3>
        <h3>Email Adress: {data.email}</h3>
      </div>
    </>
  )
}

export default Profile;