"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { YAHOO_API_KEY } from "../../../../constant/env";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import "firebase/compat/database";
import Header from "../../../../components/header/header";
import styles from "../../../../styles/search.module.css";
import Footer from "../../../../components/footer/footer";

export default function Home() {
  //status
  const [Hp, setHP] = useState<number>();
  const [Attack, setAttack] = useState<number>();
  const [Defence, setDefence] = useState<number>();
  const [Speed, setSpeed] = useState<number>();
  const [Jan, setJan] = useState<number>();
  const [UUID, setUUID] = useState<string>("");

  const [sendw0, setSendw0] = useState<number>();
  const [sendw1, setSendw1] = useState<number>();
  const [sendw2, setSendw2] = useState<number>();
  const [sendw3, setSendw3] = useState<number>();
  const [w00, setw00] = useState<string>();
  const [w01, setw01] = useState<string>();
  const [w02, setw02] = useState<string>();
  const [w03, setw03] = useState<string>();

  const [number, setNum] = useState<any>();
  const [name, setNam] = useState<string>("");
  const [price, setPri] = useState<any>();
  const [image, setIma] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [JSvalid, setJSvalid] = useState<boolean>(false);

  useEffect(() => {
    setJSvalid(true);
  }, []);

  function jan_get(jan: number) {
    var HP = 0;
    var attack = 0;
    var defence = 0;
    var speed = 0;
    var w0 = 0;
    var w1 = 0;
    var w2 = 0;
    var w3 = 0;
    if (jan > 99999999) {
      var jan013 = jan % 10;
      var jan012 = ((jan % 100) - jan013) / 10;
      var jan011 = ((jan % 1000) - jan013 - jan012 * 10) / 100;
      var jan010 = ((jan % 10000) - jan013 - jan012 * 10 - jan011 * 100) / 1000;
      var jan009 =
        ((jan % 100000) - jan013 - jan012 * 10 - jan011 * 100 - jan010 * 1000) /
        10000;
      var jan008 =
        ((jan % 1000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000) /
        100000;
      var jan007 =
        ((jan % 10000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000) /
        1000000;
      var jan006 =
        ((jan % 100000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000) /
        10000000;
      var jan005 =
        ((jan % 1000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000) /
        100000000;
      var jan004 =
        ((jan % 10000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000) /
        1000000000;
      var jan003 =
        ((jan % 100000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000 -
          jan004 * 1000000000) /
        10000000000;
      var jan002 =
        ((jan % 1000000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000 -
          jan004 * 1000000000 -
          jan003 * 10000000000) /
        100000000000;
      var jan001 =
        ((jan % 10000000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000 -
          jan004 * 1000000000 -
          jan003 * 10000000000 -
          jan002 * 100000000000) /
        1000000000000;

      HP =
        ((jan006 * 10000 +
          jan008 * 1000 +
          jan007 * 100 +
          jan009 * 10 +
          jan004) %
          1999) +
        1000;
      attack =
        ((jan005 * 10000 +
          jan001 * 1000 +
          jan011 * 100 +
          jan003 * 10 +
          jan012) %
          499) +
        100;
      defence =
        ((jan007 * 1000 + jan005 * 100 + jan002 * 10 + jan001) % 499) + 100;
      speed = ((jan008 * 100 + jan010 * 10 + jan005) % 97) + 50;
      w0 = (jan005 + jan003 * jan002 + jan005) % 5;
      w1 = (jan013 + jan011 * jan006 + jan002) % 3;
      w2 = (jan009 + jan003 * jan008 + jan004) % 4;
      w3 = (jan001 + jan006 * jan010 + jan007) % 3;
    }
    if (jan <= 99999999) {
      var jan013 = jan % 10;
      var jan012 = ((jan % 100) - jan013) / 10;
      var jan011 = ((jan % 1000) - jan013 - jan012 * 10) / 100;
      var jan010 = ((jan % 10000) - jan013 - jan012 * 10 - jan011 * 100) / 1000;
      var jan009 =
        ((jan % 100000) - jan013 - jan012 * 10 - jan011 * 100 - jan010 * 1000) /
        10000;
      var jan008 =
        ((jan % 1000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000) /
        100000;
      var jan007 =
        ((jan % 10000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000) /
        1000000;
      var jan006 =
        ((jan % 100000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000) /
        10000000;
      jan005 = 0;
      jan004 = 0;
      jan003 = 0;
      jan002 = 0;
      jan001 = 0;

      HP =
        ((jan012 * 10000 +
          jan008 * 1000 +
          jan007 * 100 +
          jan009 * 10 +
          jan009) %
          1999) +
        1000;
      attack =
        ((jan011 * 10000 +
          jan009 * 1000 +
          jan011 * 100 +
          jan010 * 10 +
          jan012) %
          499) +
        100;
      defence =
        ((jan007 * 1000 + jan007 * 100 + jan010 * 10 + jan008) % 499) + 100;
      speed = ((jan008 * 100 + jan010 * 10 + jan006) % 97) + 50;
      w0 = (jan006 + jan007 * jan012 + jan013) % 5;
      w1 = (jan013 + jan011 * jan006 + jan008) % 3;
      w2 = (jan009 + jan010 * jan008 + jan009) % 4;
      w3 = (jan007 + jan006 * jan010 + jan011) % 3;
    }
    setHP(HP);
    setAttack(attack);
    setDefence(defence);
    setSpeed(speed);
    setJan(number);
    setSendw0(w0);
    setSendw1(w1);
    setSendw2(w2);
    setSendw3(w3);
    if (w0 == 0) {
      setw00("たたく");
    } else if (w0 == 1) {
      setw00("ちゅーちゅーする");
    } else if (w0 == 2) {
      setw00("ぜんりょくこうげき");
    } else if (w0 == 3) {
      setw00("じばく");
    } else if (w0 == 4) {
      setw00("ぺちぺちする");
    } else {
      setw00("エラーです");
    }
    if (w1 == 0) {
      setw01("ねる");
    } else if (w1 == 1) {
      setw01("ぐっすりねる");
    } else if (w1 == 2) {
      setw01("ぜっき");
    } else {
      setw01("エラーです");
    }
    if (w2 == 0) {
      setw02("ちょうはつ");
    } else if (w2 == 1) {
      setw02("ひきこもる");
    } else if (w2 == 2) {
      setw02("こわいおにいさんをつれてくる");
    } else if (w2 == 3) {
      setw02("にらむ");
    } else {
      setw02("エラーです");
    }
    if (w3 == 0) {
      setw03("ざんねんでしたー");
    } else if (w3 == 1) {
      setw03("ぎあちぇんじ");
    } else if (w3 == 2) {
      setw03("みちづれ");
    } else {
      setw03("エラーです");
    }
  }
  const changeNum = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setNum(Number(event.target.value));
  };

  async function fetchname() {
    const requestData = {
      jancode: number,
    };

    try {
      const url = `https://yahooshop.azurewebsites.net/api/httpYahooApi`;
      const sendNum = number;
      console.log("Sending Jancode");
      const requestData = {
        jancode: sendNum,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) {
        console.log("Error");
        return;
      }
      const data = await response.json();
      console.log(data);
      setNam(data.hits[0].name);
      setPri(data.hits[0].price);
      setIma(data.hits[0].image.small);
      jan_get(Number(number));
      setIsOpen(true);
      setIsError(false);
    } catch (error) {
      console.error("エラーです:", error);
      setIsOpen(false);
      setIsError(true);
    }
  }

  async function getUid() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      setUUID(user.uid);
      return user.uid;
    }
  }

  const sendStatus = async () => {
    try {
      const UUID = await getUid();
      const db = getDatabase();
      await set(ref(db, `User/${UUID}/Charadata/${Jan}/Status`), {
        Name: name,
        HP: Hp,
        Attack: Attack,
        Defence: Defence,
        Speed: Speed,
        CharaImage: image,
        w00: sendw0,
        w01: sendw1,
        w02: sendw2,
        w03: sendw3,
      });
      console.log("send");
    } catch (error) {
      console.error("エラーです:", error);
    }
  };

  const sendNum = () => {
    console.log(number);
    fetchname();
    setNam("");
    setNum("");
    setIma("");
    setPri("");
  };

  if (JSvalid) {
    if (UUID != undefined) {
      return (
        <main>
          <Header children="入力" />
          <div className="container">
            <div className={styles.wrapper}>
              <div className="search">
                <input
                  className={styles.input}
                  value={number}
                  onChange={changeNum}
                  placeholder="JANコード"
                />
                <button
                  className={styles.button}
                  onClick={() => {
                    sendNum();
                  }}
                >
                  検索
                </button>
              </div>
              <div className="accordion">この商品はありません</div>
              <div className={styles["info-reg"]}>
                <div className="accordion-body">
                  <div className={styles.information}>
                    <div className={styles["img-name-price"]}>
                      <div className={styles.image}>
                        <img src={image} />
                      </div>
                      <ul>
                        <li className={styles.name}>{name}</li>
                        <li className={styles.price}>{price}円</li>
                      </ul>
                    </div>
                    <div className={styles["status-actions"]}>
                      <table className={styles.status}>
                        <tbody>
                          <tr>
                            <td className={styles.data1}>HP</td>
                            <td className={styles.data2}>{Hp}</td>
                          </tr>
                          <tr>
                            <td className={styles.data1}>Attack</td>
                            <td className={styles.data2}>{Attack}</td>
                          </tr>
                          <tr>
                            <td className={styles.data1}>Defence</td>
                            <td className={styles.data2}>{Defence}</td>
                          </tr>
                          <tr>
                            <td className={styles.data1}>Speed</td>
                            <td className={styles.data2}>{Speed}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={styles["actions-box"]}>
                        <ul className={styles.actions}>
                          <li>{w00}</li>
                          <li>{w01}</li>
                          <li>{w02}</li>
                          <li>{w03}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.registration_button}
                      onClick={() => {
                        sendStatus();
                        setIsOpen(false);
                        alert("登録しました");
                      }}
                    >
                      登録
                    </button>
                    <button
                      className={styles.registration_button}
                      onClick={() => setIsOpen(false)}
                    >
                      戻る
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <style jsx>{`
            .search {
              height: ${isOpen ? 0 : "auto"};
              overflow: ${isOpen ? "hidden" : "visible"};
              margin-top: ${isOpen ? "0" : "15%"};
            }
            .accordion {
              height: ${isError ? "80%" : 0};
              width: 100%;
              font-size: 2rem;
              text-align: center;
              overflow: hidden;
            }

            .accordion-body {
              height: ${isOpen ? "auto" : 0};
              overflow: hidden;
            }

            @media screen and (max-width: 767px) {
              .search {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: ${isOpen ? 0 : "45%"};
                margin-top: ${isOpen ? "0" : "30%"};
              }
            }
          `}</style>
        </main>
      );
    } else {
      return (
        <main>
          <Header children="入力" />
          <h1>ログインをやり直してください</h1>
        </main>
      );
    }
  } else {
    return (
      <main>
        <h1>please enable javascript</h1>
        <div>
          バーコードバトラーでなんで手入力なんだろうな。まあ手入力にもjsは必要だけど。
          <br />
          ということで、javascriptをオンにしてください。
        </div>
      </main>
    );
  }
}
