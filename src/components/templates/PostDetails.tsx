import Head from "next/head";
import useSWR, { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import {
  FaRegHeart,
  FaEllipsisH,
  FaRegComment,
  FaTelegramPlane,
  FaRegBookmark,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/postPage.module.css";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { getAuth } from "@firebase/auth";
import type { ChangeEvent } from "react";
import type { Comment } from "../../../types/types";
import type { MutableRefObject } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());
type Props = {
  close?: (e: any) => void;
  post_id: number;
};
export default function PostDetails(props: Props) {
  const [inputComment, setInputComment] = useState<string>("");
  // selectbutton表示非表示
  const [select, setSelect] = useState<boolean>(false);
  const { data: session } = useSession();

  // ログインユーザー情報
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;
  console.log(`ログインユーザーID:${currentUserId}`);

  // 結合データ取得
  const {
    data: connectData,
    error: connectDataError,
    isLoading: connectDataIsLoading,
  } = useSWR( () => "api/getAllPostIdQuery?post_id=22", fetcher);

  // コメントデータ取得
  const {
    data: commentsData,
    error: commentsDataError,
    isLoading: commentsDataIsLoading,
  } = useSWR("api/getCommentsData?post_id=22", fetcher);

  // Favoritesデータ取得
  const {
    data: favsData,
    error: favsDataError,
    isLoading: favsDataIsLoading,
  } = useSWR("api/getFavsDataPostIdQuery?post_id=22", fetcher);

  const {
    data: currentUserFav,
    error: currentUserFavError,
    isLoading: currentUserFavIsLoading,
  } = useSWR(
    `api/getCuurentUserFavQuery?post_id=22&user_id=${currentUserId}`,
    fetcher
  );

  // keepsデータ取得
  const {
    data: keepsData,
    error: keepsDataError,
    isLoading: keppsDataIsLoading,
  } = useSWR("api/getKeepsDataPostIdQuery?post_id=22", fetcher);

  const {
    data: currentUserKeep,
    error: kcurrentUserKeepError,
    isLoading: currentUserKeepIsLoading,
  } = useSWR(
    `api/getCuurentUserKeepQuery?post_id=22&user_id=${currentUserId}`,
    fetcher
  );

  const { mutate } = useSWRConfig();

  const inputCommentEl: MutableRefObject<null> = useRef(null);
  if (
    connectDataIsLoading ||
    commentsDataIsLoading ||
    favsDataIsLoading ||
    keppsDataIsLoading ||
    currentUserFavIsLoading ||
    currentUserKeepIsLoading
  )
    return <div>loading...</div>;
  if (
    connectDataError |
    commentsDataError |
    favsDataError |
    keepsDataError |
    currentUserFavError |
    kcurrentUserKeepError
  )
    return <div>failed to load</div>;

  // コメントアイコンクリック時にinputタグにフォーカス
  const onClickCommentIcon: () => void = () => {
    if (inputCommentEl.current) {
      inputCommentEl.current.focus();
    }
  };

  // postのtimestampの表記を設定
  const postTimestamp = Date.parse(connectData[0].timestamp);
  const postTimestampData = new Date(postTimestamp).toLocaleString();
  const timestampUntilMinits = postTimestampData.slice(0, -3);

  // コメントを追加
  const onClickSendCommnet = (e: any) => {
    mutate("/api/postCommentsData");
    e.preventDefault();
    fetch("/api/postCommentsData", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        comment: inputComment,
        post_id: 22,
        user_name: connectData[0].user_name,
      }),
    }).catch((e) => console.log(e));
    setInputComment("");
  };

  // いいね追加ボタン
  const onClickAddGood = (e:any) => {
    e.preventDefault();
    
    if (currentUserId) {
      fetch("/api/postFavsData", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          post_id: 22,
          user_id: connectData[0].user_id,
          user_name: connectData[0].user_name,
        }),
      })
      .then((res) => {
        // res.json();
        // mutate(`/api/getCuurentUserFavQuery?post_id=22&user_id=${currentUserId}`);
    //     const div = document.getElementById('redFavBtn');
    //  div?.classList.add(`${styles.redFavBtnStyle}`);
        })
        .catch((e) => console.log(e));
    }
    const div = document.getElementById('redFavBtn');
     div?.classList.add(`${styles.redFavBtnStyle}`);
  };

  // いいね解除ボタン
  const onClickDeleteGood = (e: any) => {
    e.preventDefault();
    const div = document.getElementById('whiteFavBtn');
     div?.classList.add(`${styles.whiteFavBtn}`);
    if (currentUserId) {
      fetch("/api/deleteFavData", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          post_id: 22,
          user_id: connectData[0].user_id,
        }),
      })
        .then((res) => {
          // res.json();
          // mutate(`/api/getCuurentUserFavQuery?post_id=22&user_id=${currentUserId}`);
    //       const div = document.getElementById('whiteFavBtn');
    //  div?.classList.add(`${styles.whiteFavBtn}`);
        })
        .catch((e) => console.log(e));
    }
  };
  // 保存追加ボタン
  const onClickAddKeep = () => {
      if (currentUserId) {
        fetch("/api/postKeepsData", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            post_id: 22,
            user_id: connectData[0].user_id,
          }),
        })
          .then(() => {
            mutate("/api/postKeepsData");
          })
          .catch((e) => console.log(e));
      }
  };
  // 保存解除ボタン
  const onClickDeleteKeep = (e: any) => {
    if (currentUserId) {
      fetch("/api/deleteKeepData", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          post_id: 22,
          user_id: connectData[0].user_id,
        }),
      })
        .then(() => {
          mutate("/api/deleteKeepData");
        })
        .catch((e) => console.log(e));
    }
  };
  // 右上のセレクトボタン
  const onClickSelectOpen = (e: any) => {
    setSelect(true);
  };
  const onClickSelectClose = (e: any) => {
    setSelect(false);
  };
  if (session) {
    return (
      <>
        再度ログインしてください
        {/* {session.user.email} */}
      </>
    );
  }
  return (
    <div>
      <Head> <title>{connectData[0].user_name}</title> </Head>
      <div className="h-screen flex relative">
        <IoClose
          size={30}
          onClick={props.close}
          className={`absolute top-8 right-8 text-white ${styles.closeBtn}`}
        />
        <div className="w-9/12 bg-black m-auto h-5/6 items-center flex">
          <div className="w-6/12">
            <img
              className="w-full"
              src={connectData[0].post_img}
              alt="投稿画像"
            />
          </div>
          <div className="w-6/12 h-full postText bg-white">
            <div className="flex my-3 px-4">
              <img
                src={connectData[0].icon_img}
                className={`w-1/12 bg-white ${styles.userIcon}`}
                alt="ユーザーアイコン"
              />
              <div className="post-icon-image">
                {/* {props.icon !== "" ? (
          <img src={props.icon} alt="icon" className="" />
        ) : (
          <img
            className={`w-1/12 bg-white ${styles.userIcon}`}
            src={`${process.env.PUBLIC_URL}/noIcon.png`}
            alt="NoImage"
          />
        )} */}
              </div>
              <p className="my-auto mx-3 font-medium">
                {connectData[0].user_name}
              </p>
              {select ? (
                <>
                  <div className="postdetalis__select">
                    <nav className="postdetalis__nav">
                      <ul className="postdetails__ul">
                        <li className="postdetails__li">
                          <Link href="/PostEditing?post_id=22&user_id=ontherUserId">
                            <button className="navBtn">編集</button>
                          </Link>
                        </li>
                        <li className="postdetails__liButtom">
                          <Link href="/Delete">
                            <button
                              // onClick={ClickDelition}
                              className="navBtn"
                            >
                              削除
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="postdetails__closebtn">
                    <AiOutlineClose
                      className="postdetails__closebtnicon"
                      size={27}
                      color={"rgb(38, 38, 38)"}
                      onClick={onClickSelectClose}
                    />
                  </div>
                </>
              ) : (
                <>
                  <button onClick={onClickSelectOpen} className="ml-auto m-2">
                    <FaEllipsisH size={25} />
                  </button>
                </>
              )}
            </div>
            <div className="h-3/4 py-3 px-4 overflow-scroll">
              <p>{connectData[0].caption}</p>
              {commentsData &&
                commentsData.map((comment: any, index: number) => {
                  return (
                    <div key={index} className="py-1">
                      <div className="flex">
                        <p className="mr-1 font-medium">{comment.user_name}</p>
                        <p>{comment.comment}</p>
                      </div>
                      <p>{comment.to_char}</p>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div className="flex pt-3 px-4">
              {currentUserFav.length > 0 ? (
                <button id="redFavBtn" type="button" onClick={onClickDeleteGood} className="my-2 mr-2">
                  <FaHeart size={25} id="redFavBtn"/>
                </button>
              ) : (
                // favoritesに自分のuser_nameがない時
                <button id="whiteFavBtn" type="button" onClick={onClickAddGood} className="my-2 mr-2">
                  <FaRegHeart size={25} />
                </button>
              )}
              <button onClick={onClickCommentIcon} className="m-2">
                <FaRegComment size={25} />
              </button>
              {"otherUserId" === currentUserId ? (
                <></>
              ) : (
                <Link href="/dmPage?user_id=otherUserId">
                  <button className="m-2">
                    <FaTelegramPlane size={25} />
                  </button>
                </Link>
              )}
              <p className="mt-auto mb-auto mx-1">
                いいね：{favsData.length}人
              </p>
              {currentUserKeep.length > 0 ? (
                <button onClick={onClickDeleteKeep} className="ml-auto m-2">
                  <FaBookmark size={25} />
                </button>
              ) : (
                <button onClick={onClickAddKeep} className="ml-auto m-2">
                  <FaRegBookmark size={25} />
                </button>
              )}
            </div>
            <p className="px-4 pb-3 text-xs text-gray-500">
              {timestampUntilMinits}
            </p>
            <hr />
            <form onSubmit={onClickSendCommnet} className="m-auto w-full">
              <input
                className="w-4/5"
                id="inputComment"
                placeholder="コメントを追加..."
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInputComment(e.target.value)
                }
                value={inputComment}
                ref={inputCommentEl}
              />
              <button
                className={`w-1/5 font-bold ${styles.addCommentBtn}`}
                onClick={onClickSendCommnet}
              >
                投稿する
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
