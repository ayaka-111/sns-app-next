import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const currentUserFav = await sqlExecuter.any(
              `SELECT * FROM favorites WHERE post_id = $1 AND user_id = $2`, [data.post_id, data.user_id]
        );
	res.status(200).json(
		currentUserFav
	);
};
