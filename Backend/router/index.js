const Router = require('koa-router')
const router = new Router()
const multer = require('@koa/multer') //multer
const upload = multer({ dest: 'uploads/user_files/' });                    //multer
        
const pool = require('../database');
//const { connect } = require('../database');

//get
router.get('/', async (ctx, next) => {
    const client = await pool.connect()
    try {
       ctx.body = await client.query('SELECT * FROM USER_DATA')
       ctx.body = ctx.body.rows
       //console.log(ctx.body)
       client.end()
        next()
    } catch (error) {
        ctx.body = "Ошибка"
    }
})
//get

//post video_list user
router.post('/video_lists', async (ctx, next) => {
    const email = ctx.request.body.email
    const client  = await pool.connect()
try {
    const res = await client.query("SELECT * FROM list WHERE name = ($1)", [email])//("SELECT * FROM list")  //("SELECT * FROM list WHERE name = 'lo@.lo'")   //list, user_data
    ctx.body = res.rows
    console.log(email)
    client.end()          //закрываем соединение
    next()                     // успех 200 ок
} catch (error) {
    console.log(error)
    ctx.body = "Warning" // ошибка блока catch
} finally {
    client.release()
}
})
//post video_list user

//post
router.post('/user_lists', async (ctx) => {
    const client = await pool.connect()
    const USER_name = ctx.request.body.name
    const USER_email = ctx.request.body.email
    const USER_phone = ctx.request.body.phone
    try {
        await client.query('insert into USER_DATA (first_name, email, phone) values ($1, $2, $3)', [USER_name, USER_email, USER_phone])
        console.log(ctx.request.body)
        client.end() 
        ctx.body = "Данные ушли на сервер...200 ok"// пробрасывает ошибку 404
    } catch (error) {
        console.log(error)
        ctx.body = "Ошибка запроса" // сработает при блоке catch 
    }
})
//post

//multer
router.post(                 
    '/upload-multiple-files',
    upload.fields([
        {
          name: 'video',
          maxCount: 2
        },
        {
          name: 'img',
          maxCount: 2
        }
      ]),
    async (ctx, next) => {
        try {
              for (var i = 0; i < ctx.request.files.video.length || i < ctx.request.files.img.length; i++) {
                  const client = await pool.connect()
                await client.query('INSERT INTO list (name, url, img) VALUES ($1, $2, $3) RETURNING *', [ctx.request.body.name, ctx.request.files.video[i].path, ctx.request.files.img[i].path])
                client.end()
          }
            console.log(ctx.request.body.name)
            console.log('ctx.request.files', ctx.request.files);
            ctx.body = ctx.request.files 
            next()                
        } catch (error) {
              console.log(error)
            ctx.body = "Ошибка загрузки"
          }
    }
  );
//multer


//post update
router.post('/update', async (ctx) => {
    const client = await pool.connect()
    console.log(ctx.request.body)
     const id = ctx.request.body.id
     const name_video = ctx.request.body.name
      const url_video = ctx.request.body.url
    try {
        await client.query("UPDATE list SET name = ($1), url = ($2) WHERE id = ($3)", [name_video, url_video, id])
        ctx.body = "Данные ушли на сервер...200 ok" // пробрасывает ошибку 404
    } catch (error) {
        console.log(error)
        ctx.body = "Ошибка запроса" // сработает при блоке catch 
    }
})
//post update
   
//delete
router.delete('/delete', async (ctx) => {
    // const id = ctx.request.body.id;
   try {
      const client = await pool.connect()
        await client.query('DELETE FROM list')
        ctx.body = "Данные удаленны с сервера...200 ok" // пробрасывает ошибку 404
        client.end() 
    } catch (error) {
        console.log(error)
        ctx.body = "Ошибка запроса" // сработает при блоке catch 
    }
   
})
//delete

//delete_user
router.delete('/delete_user', async (ctx) => {
    // const id = ctx.request.body.id;
   try {
      const client = await pool.connect()
        await client.query('DELETE FROM user_data')
        ctx.body = "Данные удаленны с сервера...200 ok" // пробрасывает ошибку 404
        client.end() 
    } catch (error) {
        console.log(error)
        ctx.body = "Ошибка запроса" // сработает при блоке catch 
    }
   
})
//delete_user


module.exports = router