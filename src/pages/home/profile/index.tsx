"use client";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import "firebase/compat/database";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import styles from "../../../styles/profile.module.css";

export default function Home() {
  const [userName, setUsername] = useState<string>("");
  const [userIntro, setIntro] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [JSvalid, setJSvalid] = useState<boolean>(false);
  const dbRef = ref(getDatabase());

  useEffect(() => {
    setJSvalid(true);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const UUID = await getUid();
      get(child(dbRef, `User/${UUID}/Profile/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUsername(data.Name);
            setIntro(data.Content);
          } else {
            console.log("No data available");
            setRedirect(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchProfile();
  }, [redirect]);

  const changeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setUsername(event.target.value);
  };

  const changeUserIntro = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setIntro(event.target.value);
  };

  async function getUid() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return user.uid;
    }
  }

  const sendProfile = async () => {
    try {
      const UUID = await getUid();
      const db = getDatabase();
      await set(ref(db, `User/${UUID}/Profile/`), {
        Name: userName,
        Content: userIntro,
      });
      console.log("send");
    } catch (error) {
      console.error("エラーです:", error);
    }
  };

  if (JSvalid) {
    return (
      <main>
        <Header children="PROFILE" />
        <div className="container">
          <div className="wrapper">
            <div className={styles.wrapper}>
              <label className={styles.label}>ユーザーネーム</label>
              <input
                className={styles.user_name}
                type="text"
                value={userName}
                onChange={changeUserName}
              ></input>
            </div>
            <div className={styles.wrapper}>
              <label className={styles.label}>コメント</label>
              <input
                className={styles.one_word}
                placeholder="よろしくお願いします"
                type="textarea"
                value={userIntro}
                onChange={changeUserIntro}
              ></input>
            </div>
            <div>
              <button
                className={styles.button}
                onClick={() => {
                  sendProfile();
                  alert("プロフィールを更新しました");
                }}
              >
                決定
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  } else {
    return (
      <main>
        <h1>Please enable javascript</h1>
        <div>
          あ？早くほかの人のプロフィール見れるようにしろって？そうだなぁ。お前がjavascriptをオンにしてくれたら考えてやるよ。
          <br />
          ということで、javascriptをオンにしてください。
        </div>
      </main>
    );
  }
}
