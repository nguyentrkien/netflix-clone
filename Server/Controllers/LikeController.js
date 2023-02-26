const {User} = require('../Model/User')

const LikeController = async (req,res)=>{
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if (user) {
          const { likedMovies } = user;
          const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
          if (!movieAlreadyLiked) {
            await User.findByIdAndUpdate(
              user._id,
              {
                likedMovies: [...user.likedMovies, data],
              },
              { new: true }
            );
          } else return res.send({ msg: "Movie already added to the liked list." , movies: user.likedMovies });
        } else await User.create({ email, likedMovies: [data] });
        return res.send({ msg: "Movie successfully added to liked list.", movies: user.likedMovies });
      } catch (error) {
        return res.send({ msg: "Error adding movie to the liked list" });
      }
    };
const GetLikedController = async (req,res)=>{
        try {
            const {email} = req.params;
            const user = await User.findOne({ email });
            if (user) {
              if (user.likedMovies.length != 0)
                return res.send({ msg: "Success", movies: user.likedMovies});
              else return res.send({msg: "Empty"})
            } 
            else return res.send({ msg: "There are no user"});
          } catch (error) {
            return res.send({ msg: error });
          }
        };

const RemoveLikedController = async (req, res) => {
    try {
      const { email, movieId } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        const movies = user.likedMovies;
        const movieIndex = movies.findIndex(({ id }) => id === movieId);
        // if (!movieIndex) {
        //   res.send({ msg: "Movie not found." });
        // }
        movies.splice(movieIndex, 1);
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: movies,
          },
          { new: true }
        );
        return res.send({ msg: "Movie successfully removed.", movies });
      } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
      return res.send({ msg: "Error removing movie to the liked list" });
    }
  };
module.exports = {LikeController, GetLikedController, RemoveLikedController};