const Movie = sequelize.define('Movie', {
    imdbId:{
        type: DataTypes.STRING,
        allowNull:false
    },
});

Movie.associate= (models)=>{
    Movie.hasMany(models.ViewParty,{
        onDelete: 'cascade'
    });
};