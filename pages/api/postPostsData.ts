import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const posts = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              `INSERT INTO posts(user_id, caption, timestamp, favorites, keeps, post_img) VALUES($1, $2, timezone('JST',$3), $4, $5, $6)`, [data.user_id, data.caption, 'now', [data.favorites], [data.keeps], data.post_img]
        );
	res.status(200).json(
		posts
	);
};
// export default apiRoutes;
