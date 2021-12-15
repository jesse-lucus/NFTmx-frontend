import React, { useState, useEffect } from 'react';
import Page from 'src/components/Page';
import { useHistory } from 'react-router';
import axios from 'axios';
import apiConfig from 'src/config/ApiConfig';

export default function History() {
  const history = useHistory();
  const token = window.sessionStorage.getItem('token');
  const [collectionList, setCollectionList] = useState();

  const myCollectionListhandler = async () => {
    try {
      const res = await axios.post(
        apiConfig.myCollectionList,
        {},
        {
          headers: {
            token,
          },
        }
      );
      if (res.data.response_code) {
        setCollectionList(res.data.result.docs);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    myCollectionListhandler();
  }, []);

  return (
    <Page title="NFT More">
      <>
        <section className="mt-5 mb-5">
          <div className="container-1440">
            <div className="wallet-div text-center">
              <div className="row align-items-center">
                <div className="col-md-12 col-lg-12">
                  <ul
                    className="nav nav-pills pb-5 navpb"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link "
                        id="pills-home-tab"
                        data-toggle="pill"
                        href="#pills-home"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        My Payout
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="pills-profile-tab"
                        data-toggle="pill"
                        href="#pills-profile"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        My Collections
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="pills-contact-tab"
                        data-toggle="pill"
                        href="#pills-contact"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                      >
                        Community and Helps
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content mt-5" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div className="my-collaction">
                        <h2 className="mb-3">My Collections</h2>
                        <p>
                          Create collections (your own storefrons), upload
                          digital creations, configurate your royalty, and sell
                          NFTs to your fans - all for free! You can also manage
                          smart contracts that you create outside NFTmx.{' '}
                          <a href="#">Learn More</a>
                        </p>

                        <div className="row mt-5">
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <div>
                                  <label>Create New Collection</label> <br />
                                  <button
                                    className="btn btn-green mt-3"
                                    onClick={() =>
                                      history.push('/create-collection')
                                    }
                                  >
                                    create
                                  </button>
                                </div>
                              </div>
                              <div className="collaction_div2 text-center">
                                <span>Or add an existing contract</span>
                              </div>
                            </div>
                          </div>
                          {/* <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <div className="qustion_mark">?</div>
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div> */}

                          {collectionList &&
                            collectionList.map((record, i) => {
                              return (
                                <div
                                  className=" col-md-4 col-lg-3 col-xl-2 mb-4"
                                  key={i}
                                  onClick={() => {
                                    history.push({
                                      pathname: '/create-nft',
                                      search: record._id,
                                      hash: record.contractAddress,
                                    });
                                  }}
                                >
                                  <div className="collaction_div">
                                    <div className="collaction_div1">
                                      <img src={record.baseURI} alt="" />
                                    </div>
                                    <div className="collaction_div2 text-left">
                                      <label>{record.name}</label>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="my-collaction">
                        <h2 className="mb-3">My Collections</h2>
                        <p>
                          Create collections (your own storefrons), upload
                          digital creations, configurate your royalty, and sell
                          NFTs to your fans - all for free! You can also manage
                          smart contracts that you create outside NFTmx.{' '}
                          <a href="#">Learn More</a>
                        </p>

                        <div className="row mt-5">
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <div>
                                  <label>Create New Collection</label> <br />
                                  <button className="btn btn-green mt-3">
                                    {' '}
                                    Create
                                  </button>
                                </div>
                              </div>
                              <div className="collaction_div2 text-center">
                                <span>Or add an existing contract</span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <div className="qustion_mark">?</div>
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <img src="images/img.png" alt="" />
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <img src="images/wallet-img-7.png" alt="" />
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <img src="images/wallet-img-8.png" alt="" />
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <div className="qustion_mark">?</div>
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact"
                      role="tabpanel"
                      aria-labelledby="pills-contact-tab"
                    >
                      <div className="my-collaction">
                        <h2 className="mb-3">My Collections</h2>
                        <p>
                          Create collections (your own storefrons), upload
                          digital creations, configurate your royalty, and sell
                          NFTs to your fans - all for free! You can also manage
                          smart contracts that you create outside NFTmx.{' '}
                          <a href="#">Learn More</a>
                        </p>

                        <div className="row mt-5">
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <div>
                                  <label>Create New Collection</label> <br />
                                  <button className="btn btn-green mt-3">
                                    {' '}
                                    Create
                                  </button>
                                </div>
                              </div>
                              <div className="collaction_div2 text-center">
                                <span>Or add an existing contract</span>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <div className="qustion_mark">?</div>
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <img src="images/img.png" alt="" />
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <img src="images/wallet-img-7.png" alt="" />
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <img src="images/wallet-img-8.png" alt="" />
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                          <div className=" col-md-4 col-lg-3 col-xl-2 mb-4">
                            <div className="collaction_div">
                              <div className="collaction_div1">
                                <div className="qustion_mark">?</div>
                              </div>
                              <div className="collaction_div2 text-left">
                                <label>Dibbs</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{' '}
      </>
    </Page>
  );
}
