import { Repositories } from '@/repositories'
import { CommentCreationData, DeveloperCreationData, GameCreationData, GenreCreationData, ReviewCreationData, UUID, UserCreationData, WishlistCreationData } from './repositories/types.js'

export function setupDemoDatabase(repositories: Repositories) {
  repositories.user.manager.transaction(async manager => {
    const userRepository = manager.withRepository(repositories.user)
    const wishlistRepository = manager.withRepository(repositories.wishlist)
    const reviewRepository = manager.withRepository(repositories.review)
    const commentRepository = manager.withRepository(repositories.comment)
    const gameRepository = manager.withRepository(repositories.game)
    const genreRepository = manager.withRepository(repositories.genre)
    const developerRepository = manager.withRepository(repositories.developer)

    const userData: UserCreationData[] = [
      { username: 'player1', email: 'player1@gmail.com', password: 'player1', },
      { username: 'player2', email: 'player2@gmail.com', password: 'player2', },
      { username: 'player3', email: 'player3@gmail.com', password: 'player3', },
      { username: 'player4', email: 'player4@gmail.com', password: 'player4', },
      { username: 'player5', email: 'player5@gmail.com', password: 'player5', },
    ]

    const admin = await userRepository.findOneByOrFail({ username: 'admin' })

    const userIds: UUID[] = await Promise.all(userData.map(async (data) => await userRepository.createUser(data, admin.id)).map(async (user) => (await user).id))

    const userUpdateData = [
      { avatar: 'https://gravatar.com/avatar/player1', },
      { avatar: 'https://gravatar.com/avatar/player2', },
      { avatar: 'https://gravatar.com/avatar/player3', },
      { avatar: 'https://gravatar.com/avatar/player4', },
      { avatar: 'https://gravatar.com/avatar/player5', },
    ]

    await Promise.all(userIds.map(async (id, index) => await userRepository.updateUser({ id, ...userUpdateData[index] }, admin.id)))

    const genreData: GenreCreationData[] = [
      { name: 'Action', description: 'Action games with fast-paced gameplay.', },
      { name: 'RPG', description: 'Role-playing games with character development.', },
      { name: 'Strategy', description: 'Strategy games with tactical decision-making elements.', },
      { name: 'Adventure', description: 'Adventure games with exciting stories.', },
      { name: 'Puzzle', description: 'Puzzle games that challenge the mind.', },
    ]

    const genreIds: UUID[] = await Promise.all(genreData.map(async (data) => await genreRepository.createGenre(data, admin.id)).map(async (genre) => (await genre).id))

    const developerData: DeveloperCreationData[] = [
      //id,name,description,avatar,games
      { name: 'Ubisoft', description: 'A major French video game publisher and developer.', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Ubisoft_logo.svg/1000px-Ubisoft_logo.svg.png', isStudio: true },
      { name: 'EA', description: 'An American video game company known for sports games.', avatar: 'https://jablickar.cz/wp-content/uploads/2020/05/EA-logo.png', isStudio: true },
      { name: 'Activision', description: 'An American video game publisher known for Call of Duty.', avatar: 'https://logos-world.net/wp-content/uploads/2022/05/Activision-Logo.png', isStudio: true },
      { name: 'Nintendo', description: 'A Japanese video game company known for Super Mario.', avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d2a7fa0d-5fd4-4d4d-a4c9-c673b80862d4/dbjyfvc-82c7a4e1-e499-4b97-9c60-aa94b16b4753.png/v1/fill/w_1024,h_387/nintendo_logo_transparent_by_epycwyn_dbjyfvc-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Mzg3IiwicGF0aCI6IlwvZlwvZDJhN2ZhMGQtNWZkNC00ZDRkLWE0YzktYzY3M2I4MDg2MmQ0XC9kYmp5ZnZjLTgyYzdhNGUxLWU0OTktNGI5Ny05YzYwLWFhOTRiMTZiNDc1My5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.o4pFRxPxzxuj1PYgiQtuHG2A3T5RjGY2VUFI7EToHK4', isStudio: true },
      { name: 'Sony', description: 'A Japanese video game company known for PlayStation.', avatar: 'https://1000logos.net/wp-content/uploads/2017/06/Sony-Logo-1957.png', isStudio: true },
      {
        name: 'Illusion Softworks', description: 'Illusion Softworks was established in 1997 in Brno by Petr Vochozka and Jan Kudera.[2] The company succeeded Vochozka\'s video game publisher, Vochozka Trading, through funding provided by Kudera\'s Cash Reform fund. The team initially comprised only five people, including Vochozka and Kudera. The team would expand to 40 people by the release of Mafia in 2002.',
        avatar: 'https://segaretro.org/images/f/f4/IllusionSoftworks_logo.svg', isStudio: true
      },
    ]

    const developerIds: UUID[] = await Promise.all(developerData.map(async (data) => await developerRepository.createDeveloper(data, admin.id)).map(async (developer) => (await developer).id))

    const gameData: GameCreationData[] = [
      // id,name,description,releaseDate,developers,genres,reviews,comments,cover,photos,videos
      {
        name: 'Mafia: The City of Lost Heaven', developerIds: [developerIds[5]], genreIds: [genreIds[0]], description: 'Je rok 1930. Po neúmyslném střetu s Mafií se taxikář Tommy Angelo neochotně ocitne ve světě organizovaného zločinu. Zpočátku se s rodinou Salieri vůbec nechce zaplétat, ale příslib velkých odměn brzy změní jeho názor. S tím, jak postupuje po žebříčku, jsou peníze čím dál lepší, ale práce čím dál špinavější. Tommy si možná nakonec vyslouží uznání samotných Salieriů, ale jestli se stane mafiánem, jeho nový život mu může způsobit víc problémů než ten starý.',
        releaseDate: new Date('2002-08-28'), cover: 'https://www.abcgames.cz/udaje/cd_obaly/55/5506_f1.jpg', photos: ['https://www.mafiagamezone.cz/uploads/heros/hero132-1654300971.jpg', 'https://i.pinimg.com/originals/bf/38/71/bf3871453962736579f46ca82194542d.jpg', 'https://oldpcgaming.net/wp-content/gallery/mafia/4_1.jpg', 'https://external-preview.redd.it/3_zsz1VxDxk1yWFetGb0glIqFtoJ8uncMSrxNVXW6T0.jpg?auto=webp&s=2ad3a16d5de9377bda9296c092d2975e42bf5e29'], videos: ['https://www.youtube.com/watch?v=0eIoTzIKZPI', 'https://www.youtube.com/watch?v=kge2V-JlaR0']
      }, // '1,6', '1', 
      { name: 'Game 2', developerIds: [developerIds[0], developerIds[2]], genreIds: [genreIds[1], genreIds[4]], description: 'An RPG game with a captivating story and characters.', releaseDate: new Date('2023-01-15'), cover: 'https://gravatar.com/avatar/Game2', photos: [], videos: [] }, // '2', '2',
      { name: 'Game 3', developerIds: [developerIds[1], developerIds[4]], genreIds: [genreIds[0], genreIds[2]], description: 'A strategy game with complex gameplay.', releaseDate: new Date('2023-02-01'), cover: 'https://gravatar.com/avatar/Game3', photos: [], videos: [] }, //  '3', '3',
      { name: 'Game 4', developerIds: [developerIds[2], developerIds[4]], genreIds: [genreIds[2], genreIds[3]], description: 'An adventure game with exciting quests.', releaseDate: new Date('2023-02-15'), cover: 'https://gravatar.com/avatar/Game4', photos: [], videos: [] }, // '4', '4', 
      { name: 'Game 5', developerIds: [developerIds[1], developerIds[3]], genreIds: [genreIds[1], genreIds[3]], description: 'A puzzle game that challenges the mind.', releaseDate: new Date('2023-03-01'), cover: 'https://gravatar.com/avatar/Game5', photos: [], videos: [] }, // '5', '5',
    ]

    const gameIds: UUID[] = await Promise.all(gameData.map(async (data) => await gameRepository.createGame(data, admin.id)).map(async (game) => (await game).id))

    const reviewData: ReviewCreationData[] = [
      { title: 'Awesome Game', content: 'This game is really awesome with cool features.', rating: 10, userId: userIds[0], gameId: gameIds[0], },
      { title: 'Could be better', content: 'The game is good but it could be better.', rating: 5, userId: userIds[1], gameId: gameIds[1], },
      { title: 'Fantastic', content: 'A fantastic game. Totally worth it.', rating: 10, userId: userIds[2], gameId: gameIds[2], },
      { title: 'Not my type', content: 'This game is not my type.', rating: 3, userId: userIds[3], gameId: gameIds[3], },
      { title: 'Loving it', content: 'I\'m really loving this game. Great job!', rating: 7, userId: userIds[4], gameId: gameIds[4], },
    ]

    const reviewIds: UUID[] = await Promise.all(reviewData.map(async (data) => await reviewRepository.createReview(data, admin.id)).map(async (review) => (await review).id))

    const commentData: CommentCreationData[] = [
      // id,content,user,game,createdAt
      { content: 'This game is so fun!', gameId: gameIds[0], userId: userIds[0], },
      { content: 'I love the graphics.', gameId: gameIds[1], userId: userIds[1], },
      { content: 'Could use a little more content.', gameId: gameIds[2], userId: userIds[2], },
      { content: 'The story is captivating.', gameId: gameIds[3], userId: userIds[3], },
      { content: 'One of the best games I\'ve played.', gameId: gameIds[4], userId: userIds[4], },
    ]

    const commentIds: UUID[] = await Promise.all(commentData.map(async (data) => await commentRepository.createComment(data, admin.id)).map(async (comment) => (await comment).id))

    const wishListData = [
      [1, 2, 3],
      [4, 5],
      [1, 2],
      [3, 4, 5],
      [1, 2, 3, 4, 5],
    ]

    for (let i = 0; i < wishListData.length; i++) {
      await Promise.all(wishListData[i].map(async (gameId) => await wishlistRepository.createWishlist({userId: userIds[i], gameId: gameIds[gameId - 1]}, admin.id)))
    }
  })
}