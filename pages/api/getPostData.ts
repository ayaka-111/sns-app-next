import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const posts = await sqlExecuter.any(
              `SELECT * FROM posts WHERE user_id = $1 ORDER BY timestamp DESC limit 1`, [data.user_id]
        );
	res.status(200).json(
		posts
	);
};
