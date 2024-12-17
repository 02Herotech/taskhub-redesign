import React from "react";
import MobileWhatSetUsApart from "./MobileWhatSetUsApart";

const WhatSetUsApart = () => {
  const topData = [
    {
      id: 1,
      title: (
        <>
          Immigration <br /> support
        </>
      ),
      details: (
        <>
          Settle in Australia <br /> effortlessly with our help
        </>
      ),
    },
    {
      id: 2,
      title: (
        <>
          AI powered <br /> service listings.
        </>
      ),
      details: (
        <>
          You can leverage AI to <br /> create attractive service <br />{" "}
          listings for your customers
        </>
      ),
    },

    {
      id: 3,
      title: (
        <>
          Instant Market <br /> Access
        </>
      ),
      details: (
        <>
          Start on a high! Connect <br /> with over 5000 potential <br />{" "}
          customers right away.
        </>
      ),
    },
  ];

  const bottomData = [
    {
      id: 1,
      title: (
        <>
          Business <br /> Education
        </>
      ),
      details: (
        <>
          We teach you how to start, <br /> run, and grow your business <br />{" "}
          successfully.
        </>
      ),
    },
    {
      id: 2,
      title: (
        <>
          Hands-on <br /> Support
        </>
      ),
      details: (
        <>
          We offer continuous learning <br /> opportunities to keep you <br />{" "}
          ahead of the game.
        </>
      ),
    },

    {
      id: 3,
      title: (
        <>
          Flexible <br /> promotion
        </>
      ),
      details: (
        <>
          Show off your business your <br /> way. Either with our platform{" "}
          <br /> or your own channel.
        </>
      ),
    },
  ];
  return (
    <div className="bg-[#EBE9F4]">
      <div className="mx-auto hidden max-w-7xl lg:block">
        <div className="mx-auto w-[85%] py-10">
          <h2 className="pb-10 text-left font-clashSemiBold  text-[28px] text-[#2A1769] xl:text-[32px]">
            WHAT SETS US APART
          </h2>

          <div>
            <div className="flex lg:space-x-32 xl:space-x-[170px] ">
              {topData.map((eachData, index) => (
                <div
                  key={index}
                  className=" group flex w-[160px] flex-col items-center justify-center xl:w-[190px]"
                >
                  <div
                    className="ease-in-out; flex w-full flex-col
        items-center justify-center space-y-1 rounded-2xl bg-primary text-center text-white transition-colors 
        duration-300  group-hover:bg-[#FE9B07] lg:h-[130px] xl:h-[120px]"
                  >
                    <h2 className="font-clashMedium text-[16px] font-[500]">
                      {eachData.title}
                    </h2>
                    <p className="font-satoshi text-[12px]">
                      {eachData.details}
                    </p>
                  </div>
                  <div
                    className="h-0 w-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent
                                                 border-t-[#381F8C] transition-colors duration-300 ease-in-out group-hover:border-t-[#FE9B07]"
                  ></div>
                </div>
              ))}
            </div>

            <div className="mt-[50px]">
              <div className="h-[30px] w-full bg-[#FE9B07]"></div>

              <div className="mt-[-60px] flex w-full justify-around lg:pl-2">
                <svg
                  width="197"
                  height="102"
                  viewBox="0 0 117 122"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="117" height="122" rx="58.5" fill="white" />
                  <path
                    d="M54.8321 59.8656C54.8323 60.7126 55.1691 61.5247 55.7681 62.1234C56.3672 62.722 57.1795 63.0582 58.0265 63.0579C58.8734 63.0576 59.6855 62.7209 60.2842 62.1219C60.8829 61.5228 61.219 60.7104 61.2187 59.8635C61.2185 59.0166 60.8818 58.2045 60.2827 57.6058C59.6836 57.0071 58.8713 56.671 58.0243 56.6712C57.1774 56.6715 56.3653 57.0082 55.7666 57.6073C55.168 58.2064 54.8318 59.0187 54.8321 59.8656ZM44.6806 52.417H50.0862C51.0627 52.417 51.9991 52.8049 52.6896 53.4954C53.3801 54.1858 53.768 55.1223 53.768 56.0988V63.0579C53.768 63.6223 53.5438 64.1637 53.1446 64.5628C52.7455 64.9619 52.2042 65.1861 51.6398 65.1861V77.9552H43.1271V65.1861C42.5626 65.1861 42.0213 64.9619 41.6222 64.5628C41.2231 64.1637 40.9989 63.6223 40.9989 63.0579V56.0988C40.9989 55.1223 41.3868 54.1858 42.0772 53.4954C42.7677 52.8049 43.7042 52.417 44.6806 52.417Z"
                    fill="#381F8C"
                  />
                  <path
                    d="M43.128 48.1601C43.1152 48.727 43.2157 49.2906 43.4238 49.818C43.6318 50.3455 43.9431 50.826 44.3394 51.2315C44.7357 51.6369 45.209 51.9591 45.7315 52.1792C46.254 52.3992 46.8153 52.5126 47.3822 52.5127C47.9492 52.5129 48.5105 52.3997 49.0331 52.18C49.5557 51.9602 50.0292 51.6383 50.4257 51.233C50.8222 50.8277 51.1337 50.3473 51.342 49.82C51.5503 49.2927 51.6512 48.7291 51.6386 48.1623C51.614 47.0502 51.155 45.9919 50.3599 45.2139C49.5648 44.436 48.4967 44.0003 47.3844 44C46.272 43.9997 45.2037 44.4349 44.4082 45.2125C43.6127 45.99 43.1532 47.048 43.128 48.1601ZM65.9634 54.5447H71.369C71.8527 54.5448 72.3315 54.6402 72.7783 54.8254C73.2251 55.0106 73.631 55.282 73.9729 55.6241C74.3147 55.9662 74.5859 56.3723 74.7709 56.8191C74.9558 57.266 75.0509 57.7449 75.0508 58.2286C75.0506 58.7122 74.9552 59.1911 74.77 59.6379C74.5848 60.0846 74.3134 60.4905 73.9714 60.8324C73.6293 61.1743 73.2232 61.4455 72.7763 61.6304C72.3295 61.8154 71.8505 61.9105 71.3669 61.9103C70.3901 61.9101 69.4535 61.5218 68.7631 60.8309C68.0726 60.1401 67.6849 59.2032 67.6851 58.2265C67.6854 57.2497 68.0737 56.3131 68.7646 55.6226C69.4554 54.9322 70.3923 54.5444 71.369 54.5447C72.3455 54.5447 73.2824 54.9337 73.9729 55.6241C74.6633 56.3146 75.0508 57.2521 75.0508 58.2286L75.0508 63.0574C75.0508 63.6219 74.8266 64.1632 74.4275 64.5623C74.0283 64.9614 73.487 65.1856 72.9226 65.1856L75.0508 71.5702H72.9226V77.9547H64.4099V71.5702H62.2817L64.4099 65.1856C63.8454 65.1856 63.3041 64.9614 62.905 64.5623C62.5059 64.1632 62.2817 63.6219 62.2817 63.0574V58.2265C62.2817 57.743 62.3769 57.2642 62.5619 56.8175C62.747 56.3708 63.0182 55.9649 63.36 55.6231C63.7019 55.2812 64.1078 55.01 64.5545 54.825C65.0012 54.6399 65.4799 54.5447 65.9634 54.5447Z"
                    fill="#381F8C"
                  />
                  <path
                    d="M64.4083 50.2881C64.3955 50.8549 64.496 51.4186 64.704 51.946C64.912 52.4734 65.2233 52.954 65.6196 53.3594C66.0159 53.7649 66.4892 54.0871 67.0118 54.3071C67.5343 54.5271 68.0955 54.6405 68.6625 54.6407C69.2295 54.6408 69.7907 54.5277 70.3134 54.3079C70.836 54.0882 71.3095 53.7662 71.706 53.3609C72.1025 52.9557 72.414 52.4753 72.6223 51.948C72.8306 51.4206 72.9314 50.857 72.9189 50.2902C72.8943 49.1781 72.4353 48.1198 71.6402 47.3419C70.8451 46.5639 69.777 46.1282 68.6646 46.1279C67.5522 46.1277 66.484 46.5629 65.6884 47.3404C64.8929 48.1179 64.4334 49.176 64.4083 50.2881ZM60.1519 71.5699V77.9545H55.8955V71.5699C55.3311 71.5699 54.7898 71.3457 54.3907 70.9466C53.9916 70.5475 53.7673 70.0062 53.7673 69.4417V66.1643C53.7673 65.3403 54.0947 64.5499 54.6774 63.9672C55.2601 63.3845 56.0504 63.0572 56.8745 63.0572H59.1729C59.997 63.0572 60.7873 63.3845 61.37 63.9672C61.9527 64.5499 62.2801 65.3403 62.2801 66.1643V69.4417C62.2801 70.0062 62.0559 70.5475 61.6568 70.9466C61.2576 71.3457 60.7163 71.5699 60.1519 71.5699Z"
                    fill="#381F8C"
                  />
                </svg>

                <svg
                  width="197"
                  height="102"
                  viewBox="0 0 117 122"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="117" height="122" rx="58.5" fill="white" />
                  <path
                    d="M65.3956 62.2036L52.8002 60.1312L54.6071 58.8447L57.6319 59.2633L60.6529 58.8447L65.3956 62.2036ZM57.6319 38.4012C58.2324 38.4012 58.8269 38.5195 59.3817 38.7493C59.9364 38.9791 60.4404 39.316 60.865 39.7407C61.2895 40.1653 61.6262 40.6695 61.8558 41.2243C62.0855 41.7791 62.2036 42.3737 62.2034 42.9742C62.2034 45.5005 60.5933 47.5472 57.6319 47.5472C57.0244 47.5582 56.4207 47.4481 55.8563 47.2232C55.2918 46.9984 54.7777 46.6633 54.3442 46.2375C53.9107 45.8118 53.5663 45.304 53.3312 44.7436C53.0962 44.1833 52.9751 43.5818 52.9751 42.9742C52.9751 42.3665 53.0962 41.765 53.3312 41.2047C53.5663 40.6444 53.9107 40.1365 54.3442 39.7108C54.7777 39.2851 55.2918 38.95 55.8563 38.7251C56.4207 38.5003 57.0244 38.3901 57.6319 38.4012ZM58.7699 71.4514V82.5031C58.7699 83.1653 59.0329 83.8004 59.5012 84.2687C59.9695 84.7369 60.6046 85 61.2668 85C61.929 85 62.5641 84.7369 63.0324 84.2687C63.5006 83.8004 63.7637 83.1653 63.7637 82.5031V71.4514C63.7477 70.7998 63.4776 70.1803 63.0111 69.7251C62.5445 69.2699 61.9186 69.0151 61.2668 69.0151C60.615 69.0151 59.989 69.2699 59.5225 69.7251C59.056 70.1803 58.7859 70.7998 58.7699 71.4514ZM74.065 77.7612C74.0648 78.1451 73.9124 78.5133 73.6411 78.785C73.3698 79.0568 73.0018 79.2098 72.6179 79.2106H64.962V71.974H68.2733V64.742C68.2733 63.9456 68.9226 63.2956 69.7198 63.2956H72.6179C73.4142 63.2956 74.065 63.9449 74.065 64.742V77.7612ZM57.5753 79.2098H42.7123C42.522 79.2098 42.3336 79.1723 42.1579 79.0995C41.9821 79.0266 41.8224 78.9198 41.6879 78.7852C41.5535 78.6506 41.4468 78.4908 41.3742 78.315C41.3015 78.1391 41.2642 77.9507 41.2644 77.7604V64.7412C41.2648 64.3575 41.4175 63.9896 41.689 63.7184C41.9605 63.4471 42.3286 63.2948 42.7123 63.2948H45.6089C46.4075 63.2948 47.0568 63.9441 47.0568 64.7412V71.9733H57.5753V79.2098ZM49.749 63.5957C49.6416 64.2491 49.7979 64.9184 50.1837 65.4565C50.5694 65.9947 51.153 66.3577 51.8063 66.4659L62.7102 68.263C63.3635 68.3697 64.0325 68.2129 64.5703 67.8269C65.1081 67.4409 65.4709 66.8573 65.5789 66.2042C65.6323 65.8808 65.6215 65.55 65.5471 65.2308C65.4726 64.9115 65.3359 64.6101 65.1448 64.3437C64.9537 64.0774 64.712 63.8513 64.4335 63.6784C64.155 63.5055 63.8451 63.3893 63.5216 63.3363L52.6177 61.5377C51.9645 61.4309 51.2956 61.5877 50.7578 61.9735C50.22 62.3593 49.8572 62.9427 49.749 63.5957ZM37.4515 49.9083C33.8936 49.9083 31 47.0148 31 43.4545C31 39.8943 33.8936 37 37.4515 37C41.0095 37 43.9068 39.8951 43.9068 43.4545C43.9068 47.0148 41.0095 49.9083 37.4515 49.9083ZM37.4515 48.3111C38.7394 48.3095 39.974 47.7973 40.8847 46.8867C41.7954 45.9762 42.3078 44.7416 42.3096 43.4538C42.3096 40.7774 40.1279 38.5965 37.4515 38.5965C34.7729 38.5965 32.5965 40.7774 32.5965 43.4538C32.5973 44.7414 33.109 45.9761 34.0192 46.8868C34.9295 47.7974 36.1639 48.3097 37.4515 48.3111Z"
                    fill="#381F8C"
                  />
                  <path
                    d="M37.4846 44.3068C37.4107 44.3407 37.3294 44.3554 37.2483 44.3493C37.1671 44.3432 37.0889 44.3167 37.0208 44.2721C36.9629 44.235 36.9135 44.1859 36.8761 44.1281C36.8386 44.0704 36.8139 44.0053 36.8037 43.9373L36.7969 40.1862C36.8018 40.0609 36.8551 39.9422 36.9456 39.8553C37.036 39.7683 37.1567 39.7197 37.2822 39.7197C37.4076 39.7197 37.5283 39.7683 37.6187 39.8553C37.7092 39.9422 37.7625 40.0609 37.7674 40.1862V43.0964L40.2553 41.9245C40.3128 41.897 40.3752 41.8812 40.4388 41.8779C40.5025 41.8746 40.5661 41.8839 40.6262 41.9053C40.6862 41.9267 40.7415 41.9597 40.7887 42.0024C40.836 42.0452 40.8743 42.0969 40.9016 42.1545C40.9563 42.271 40.9627 42.4043 40.9193 42.5255C40.8759 42.6466 40.7863 42.7456 40.6701 42.8008L37.4846 44.306V44.3068ZM57.6318 51.1851L63.56 50.2199V54.3872L66.4867 56.5884C66.768 56.872 66.6542 57.1948 66.5878 57.286C66.5083 57.3918 66.3901 57.4619 66.2591 57.4808C66.1281 57.4997 65.9949 57.466 65.8887 57.3871L62.195 54.5953C61.8271 54.3466 61.3763 54.2521 60.9395 54.332C60.5026 54.4119 60.1145 54.6599 59.8584 55.0228C59.6024 55.3856 59.4988 55.8344 59.5699 56.2728C59.641 56.7111 59.8812 57.1042 60.2388 57.3675L66.5501 61.8002C66.8434 62.0068 67.2605 62.1479 67.676 62.1479C68.0304 62.1479 68.4475 62.0008 68.7582 61.7806C69.4203 61.31 69.6639 60.4752 69.4391 59.706L67.0953 52.7801C66.4694 51.0592 64.891 49.0336 62.5201 49.0336H52.7428C50.3726 49.0336 48.7942 51.0592 48.1676 52.7801L45.8237 59.706C45.5983 60.4752 45.8433 61.3108 46.5055 61.7806C46.8139 62.0008 47.2324 62.1479 47.5854 62.1479C48.0032 62.1479 48.4209 62.0076 48.7135 61.8002L55.0248 57.3675C55.3824 57.1042 55.6226 56.7111 55.6937 56.2728C55.7648 55.8344 55.6612 55.3856 55.4052 55.0228C55.1491 54.6599 54.761 54.4119 54.3242 54.332C53.8873 54.2521 53.4365 54.3466 53.0686 54.5953L49.3727 57.3871C49.2666 57.4658 49.1337 57.4993 49.003 57.4804C48.8723 57.4614 48.7544 57.3916 48.6751 57.286C48.6081 57.1763 48.5814 57.0466 48.5995 56.9193C48.6177 56.7921 48.6796 56.6751 48.7746 56.5884C48.7746 56.5884 50.7595 55.0975 51.7029 54.3872V50.2199L57.6318 51.1859V51.1851Z"
                    fill="#381F8C"
                  />
                </svg>

                <svg
                  width="197"
                  height="102"
                  viewBox="0 0 117 122"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="117" height="122" rx="58.5" fill="white" />
                  <path
                    d="M33.5112 69.9839C33.5476 69.0171 33.7009 66.8328 34.3433 64.692C34.7558 63.3176 35.3584 62.0008 36.2275 61.035C37.0838 60.0835 38.2004 59.4678 39.6964 59.4678C41.2181 59.4678 42.3734 60.5847 43.3716 62.6248C44.3623 64.6495 45.1021 67.3925 45.8732 70.2802L45.8732 70.2803L45.8985 70.3748C46.4147 72.3056 47.0314 74.6119 47.7472 76.4461C48.11 77.3759 48.5101 78.216 48.9535 78.832C49.3802 79.4247 49.9421 79.9408 50.6541 79.9408C51.9092 79.9408 52.8367 79.2655 53.4984 78.3459C54.1517 77.4381 54.5771 76.2559 54.859 75.1159C55.2702 73.453 55.3969 71.7899 55.4355 70.9839H56.8757C56.8392 71.9505 56.6851 74.1345 56.0393 76.275C55.6247 77.6491 55.0189 78.9658 54.145 79.9317C53.2839 80.8833 52.1602 81.4999 50.6541 81.4999C49.1326 81.4999 47.9833 80.3864 46.9913 78.3516C46.0065 76.3315 45.2729 73.5951 44.5016 70.7129C43.9497 68.6479 43.3184 66.289 42.592 64.4465C42.2297 63.5273 41.8316 62.7044 41.3891 62.1031C40.9607 61.5208 40.4014 61.0269 39.6964 61.0269C38.4534 61.0269 37.5359 61.7055 36.882 62.6238C36.2359 63.5312 35.8134 64.7127 35.5325 65.8521C35.1225 67.5148 34.9928 69.1778 34.9526 69.9839H33.5112Z"
                    fill="#381F8C"
                    stroke="#381F8C"
                  />
                  <path
                    d="M59.0113 60.7222C59.7339 62.2881 60.0952 63.9614 60.0952 65.7418C60.0952 63.9614 60.4452 62.2881 61.1452 60.7222C61.8678 59.1562 62.8387 57.794 64.0581 56.6357C65.2774 55.4773 66.7113 54.5656 68.3597 53.9006C70.0081 53.2141 71.7694 52.8709 73.6435 52.8709C71.7694 52.8709 70.0081 52.5384 68.3597 51.8734C66.7554 51.2163 65.296 50.2774 64.0581 49.1062C62.8252 47.9302 61.8369 46.5438 61.1452 45.0197C60.4452 43.4537 60.0952 41.7805 60.0952 40C60.0952 41.7805 59.7339 43.4537 59.0113 45.0197C58.3113 46.5856 57.3517 47.9478 56.1323 49.1062C54.8945 50.2774 53.4351 51.2163 51.8307 51.8734C50.1823 52.5384 48.4211 52.8709 46.5469 52.8709C48.4211 52.8709 50.1823 53.2141 51.8307 53.9006C53.4791 54.5656 54.913 55.4773 56.1323 56.6357C57.3517 57.794 58.3113 59.1562 59.0113 60.7222Z"
                    fill="#381F8C"
                  />
                  <path
                    d="M83.7088 65.1594C83.9546 65.4051 84.1495 65.6968 84.2825 66.0178C84.4155 66.3389 84.4839 66.683 84.4839 67.0305C84.4839 67.378 84.4155 67.7221 84.2825 68.0432C84.1495 68.3642 83.9546 68.6559 83.7088 68.9016L71.8601 80.7521L66.8711 81.9995L68.1183 77.0797L79.9721 65.1644C80.4393 64.6948 81.066 64.4181 81.7277 64.3892C82.3894 64.3603 83.0378 64.5814 83.5442 65.0084L83.7088 65.1594ZM74.3545 81.9995H84.3324H74.3545ZM81.838 68.2779L83.0852 69.5253L81.838 68.2779Z"
                    fill="#381F8C"
                  />
                  <path
                    d="M74.3545 81.9995H84.3324M81.838 68.2779L83.0852 69.5253M83.7088 65.1594C83.9546 65.4051 84.1495 65.6968 84.2825 66.0178C84.4155 66.3389 84.4839 66.683 84.4839 67.0305C84.4839 67.378 84.4155 67.7221 84.2825 68.0432C84.1495 68.3642 83.9546 68.6559 83.7088 68.9016L71.8601 80.7521L66.8711 81.9995L68.1183 77.0797L79.9721 65.1644C80.4393 64.6948 81.066 64.4181 81.7277 64.3892C82.3894 64.3603 83.0378 64.5814 83.5442 65.0084L83.7088 65.1594Z"
                    stroke="#EBE9F4"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <svg
                  width="197"
                  height="102"
                  viewBox="0 0 117 122"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="117" height="122" rx="58.5" fill="white" />
                  <path
                    d="M74.238 69.75C75.3004 69.75 76.196 70.12 76.9249 70.86C77.6538 71.6 78.012 72.4633 77.9997 73.45L63.1195 79L50.1481 75.3V58.65H53.7615L67.2334 63.6265C68.197 64.0088 68.6788 64.6995 68.6788 65.6985C68.6788 66.2782 68.4687 66.7838 68.0487 67.2155C67.6287 67.6472 67.0975 67.8753 66.4551 67.9H61.2665L58.0236 66.6605L57.4121 68.3995L61.2665 69.75H74.238ZM66.8257 44.2755C68.1352 42.7585 69.8029 42 71.829 42C73.5091 42 74.9298 42.6167 76.091 43.85C77.2523 45.0833 77.87 46.5017 77.9441 48.105C77.9441 49.3753 77.3264 50.8923 76.091 52.656C74.8557 54.4197 73.6388 55.8935 72.4405 57.0775C71.2422 58.2615 69.3706 60.019 66.8257 62.35C64.2561 60.019 62.366 58.2615 61.1553 57.0775C59.9446 55.8935 58.7278 54.4197 57.5047 52.656C56.2817 50.8923 55.6826 49.3753 55.7073 48.105C55.7073 46.4277 56.3064 45.0093 57.5047 43.85C58.7031 42.6907 60.1485 42.074 61.8409 42C63.8175 42 65.4791 42.7585 66.8257 44.2755ZM39 58.65H46.4419V79H39V58.65Z"
                    fill="#381F8C"
                  />
                </svg>

                <svg
                  width="197"
                  height="102"
                  viewBox="0 0 117 122"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="117" height="122" rx="58.5" fill="white" />
                  <path
                    d="M58 63.7143C55.2005 63.7143 52.5156 62.5855 50.5361 60.5761C48.5565 58.5668 47.4444 55.8416 47.4444 53H51.6667C51.6667 54.705 52.3339 56.3401 53.5217 57.5457C54.7094 58.7513 56.3203 59.4286 58 59.4286C59.6797 59.4286 61.2906 58.7513 62.4783 57.5457C63.6661 56.3401 64.3333 54.705 64.3333 53H68.5556C68.5556 55.8416 67.4435 58.5668 65.4639 60.5761C63.4844 62.5855 60.7995 63.7143 58 63.7143ZM58 42.2857C59.6797 42.2857 61.2906 42.963 62.4783 44.1686C63.6661 45.3742 64.3333 47.0093 64.3333 48.7143H51.6667C51.6667 47.0093 52.3339 45.3742 53.5217 44.1686C54.7094 42.963 56.3203 42.2857 58 42.2857ZM72.7778 48.7143H68.5556C68.5556 47.3073 68.2825 45.914 67.7521 44.6141C67.2216 43.3142 66.4441 42.1331 65.4639 41.1381C64.4837 40.1432 63.3201 39.354 62.0394 38.8156C60.7588 38.2771 59.3862 38 58 38C55.2005 38 52.5156 39.1288 50.5361 41.1381C48.5565 43.1475 47.4444 45.8727 47.4444 48.7143H43.2222C40.8789 48.7143 39 50.6214 39 53V78.7143C39 79.8509 39.4448 80.941 40.2367 81.7447C41.0285 82.5485 42.1024 83 43.2222 83H72.7778C73.8976 83 74.9715 82.5485 75.7633 81.7447C76.5552 80.941 77 79.8509 77 78.7143V53C77 51.8634 76.5552 50.7733 75.7633 49.9695C74.9715 49.1658 73.8976 48.7143 72.7778 48.7143Z"
                    fill="#381F8C"
                  />
                </svg>

                <svg
                  width="197"
                  height="102"
                  viewBox="0 0 117 122"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="117" height="122" rx="58.5" fill="white" />
                  <path
                    d="M78.7212 68.0721L73.707 43.4471C73.6447 43.1315 73.4775 42.8462 73.2327 42.6376C72.9878 42.429 72.6796 42.3093 72.3582 42.2979L41.1846 41H41.1235C40.9144 40.9984 40.7074 41.0427 40.5174 41.13C40.3273 41.2172 40.1587 41.3451 40.0236 41.5047C39.8885 41.6643 39.7901 41.8517 39.7355 42.0536C39.6808 42.2554 39.6713 42.4668 39.7074 42.6728L44.2347 69.9385C44.2925 70.2845 44.4748 70.5974 44.7472 70.8184C45.0196 71.0394 45.3634 71.1533 45.7139 71.1386L77.3724 69.7959C77.5803 69.7871 77.7838 69.7333 77.9689 69.6382C78.154 69.5431 78.3162 69.409 78.4444 69.2451C78.5727 69.0813 78.6638 68.8915 78.7116 68.689C78.7594 68.4865 78.7627 68.276 78.7212 68.0721ZM75.5264 68.5184L47.242 69.7042C46.8529 69.7223 46.4704 69.5978 46.1665 69.3539C45.8627 69.1101 45.6583 68.7637 45.5917 68.3798L41.5534 44.2722C41.5159 44.0383 41.531 43.799 41.5976 43.5716C41.6643 43.3443 41.7808 43.1346 41.9387 42.958C42.0966 42.7814 42.2919 42.6422 42.5104 42.5505C42.7289 42.4589 42.965 42.4172 43.2017 42.4283L71.046 43.5754C71.4026 43.5887 71.7445 43.7209 72.0174 43.9509C72.2902 44.1809 72.4783 44.4956 72.5517 44.8448L77.0342 66.6153C77.0792 66.8418 77.0745 67.0754 77.0203 67.2999C76.9661 67.5244 76.8637 67.7344 76.7203 67.9154C76.5769 68.0965 76.3958 68.2441 76.1897 68.3482C75.9836 68.4523 75.7572 68.5104 75.5264 68.5184ZM60.3349 79.535H41.3741C41.1865 79.5449 41.0099 79.6264 40.8806 79.7627C40.7513 79.899 40.6792 80.0797 40.6792 80.2675C40.6792 80.4554 40.7513 80.6361 40.8806 80.7723C41.0099 80.9086 41.1865 80.9901 41.3741 81H60.3349C60.5225 80.9901 60.6992 80.9086 60.8284 80.7723C60.9577 80.6361 61.0298 80.4554 61.0298 80.2675C61.0298 80.0797 60.9577 79.899 60.8284 79.7627C60.6992 79.6264 60.5225 79.5449 60.3349 79.535ZM45.6508 71.8537C45.1419 71.8517 44.6501 71.6702 44.2621 71.341C43.8741 71.0119 43.6147 70.5563 43.5297 70.0546L41.533 58.0171C40.4984 58.3858 39.6033 59.0657 38.9707 59.9635C38.3381 60.8614 37.999 61.9331 38 63.0314V73.5998C37.9992 74.2989 38.1362 74.9912 38.4032 75.6372C38.6703 76.2833 39.062 76.8703 39.5561 77.3648C40.0502 77.8593 40.637 78.2515 41.2828 78.519C41.9286 78.7865 42.6208 78.9241 43.3199 78.9238H58.3973C59.0962 78.9243 59.7883 78.7871 60.4341 78.52C61.0799 78.2528 61.6667 77.861 62.1609 77.367C62.6552 76.8729 63.0472 76.2862 63.3146 75.6405C63.582 74.9949 63.7195 74.3028 63.7192 73.6039V71.0897L45.7425 71.8517L45.6508 71.8537Z"
                    fill="#381F8C"
                  />
                  <path
                    d="M53.6116 53.174C53.4845 53.5199 53.422 53.8936 53.297 54.6396L52.877 57.1457C52.8175 57.4887 52.817 57.8074 52.8757 58.0824C52.9343 58.3574 53.0508 58.5828 53.2179 58.7449C53.3851 58.907 53.5995 59.0024 53.848 59.0251C54.0965 59.0478 54.3738 58.9975 54.663 58.8772C54.9522 58.7569 55.2472 58.5691 55.5299 58.3253C55.8126 58.0816 56.0771 57.787 56.3071 57.4596C56.5372 57.1322 56.728 56.7789 56.8679 56.4213C57.0078 56.0637 57.0938 55.7094 57.1207 55.38L57.1699 54.8292C57.1432 55.1768 57.1812 55.4894 57.2813 55.7472C57.3814 56.0049 57.5415 56.202 57.7513 56.3259C57.9611 56.4499 58.216 56.4979 58.4997 56.4669C58.7834 56.4359 59.0897 56.3267 59.399 56.1461C59.7083 55.9655 60.0139 55.7175 60.2961 55.4181C60.5783 55.1186 60.831 54.7743 61.038 54.407C61.2451 54.0397 61.4019 53.6576 61.4985 53.285C61.595 52.9124 61.6293 52.5577 61.5989 52.2433L61.6502 52.7649C61.6771 53.0632 61.7631 53.3183 61.903 53.5143C62.0429 53.7104 62.2337 53.8433 62.4638 53.9051C62.6938 53.9668 62.9583 53.956 63.241 53.8733C63.5237 53.7906 63.8187 53.6378 64.1079 53.4241C64.3971 53.2105 64.6744 52.9407 64.9229 52.631C65.1714 52.3214 65.3858 51.9785 65.553 51.6233C65.7202 51.2682 65.8366 50.9082 65.8952 50.5655C65.9539 50.2229 65.9534 49.9046 65.8939 49.6304L65.4739 47.6092C65.3489 47.0076 65.2864 46.7068 65.1593 46.5069C65.0269 46.2987 64.8404 46.1549 64.612 46.0849C64.3836 46.0149 64.1183 46.0202 63.8335 46.1004C63.5596 46.1775 63.2408 46.3616 62.6032 46.7297L56.1678 50.4452C55.5301 50.8134 55.2113 50.9974 54.9374 51.2366C54.6526 51.4852 54.3873 51.7862 54.1589 52.12C53.9305 52.4538 53.744 52.8129 53.6116 53.174ZM63.7878 54.752C64.3365 54.4367 64.8763 53.9736 65.3546 53.4076L65.3546 54.226C65.3546 57.0809 65.3546 58.5087 64.5315 59.8704C63.8693 60.9674 62.8827 61.6756 61.1411 62.7083L61.1411 60.0654C61.1411 59.3576 61.1411 59.004 60.9999 58.8221C60.9075 58.7028 60.7745 58.6362 60.6144 58.629C60.37 58.6179 60.0421 58.8073 59.3855 59.1864C58.7289 59.5655 58.4009 59.7548 58.1565 60.0481C57.9964 60.2402 57.8634 60.4603 57.771 60.6863C57.6298 61.0312 57.6298 61.3848 57.6298 62.0927L57.6298 64.7356C55.8883 65.7138 54.9016 66.1442 54.2394 65.8126C53.4163 65.4012 53.4163 63.9734 53.4163 61.1185L53.4163 60.3001C53.8949 60.3138 54.4348 60.1536 54.9838 59.835C55.7953 59.367 56.5766 58.5836 57.1692 57.6436C57.7729 57.8949 58.5644 57.7699 59.3855 57.2937C60.2065 56.8219 60.998 56.0329 61.6017 55.0845C62.1943 55.3402 62.9763 55.2211 63.7878 54.752Z"
                    fill="#381F8C"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-[20px] flex lg:ml-[140px] lg:space-x-[118px] xl:ml-[180px] xl:space-x-[170px]  ">
              {bottomData.map((eachData, index) => (
                <div
                  key={index}
                  className=" group flex w-[170px] flex-col items-center justify-center xl:w-[190px] "
                >
                  <div
                    className="h-0 w-0 border-b-[25px] border-l-[15px] border-r-[15px] border-b-[#381F8C] border-l-transparent
                                                 border-r-transparent transition-colors duration-300 ease-in-out group-hover:border-b-[#FE9B07]"
                  ></div>

                  <div
                    className="ease-in-out; flex w-full flex-col
        items-center justify-center space-y-1 rounded-2xl bg-primary text-center text-white transition-colors 
        duration-300  group-hover:bg-[#FE9B07] lg:h-[130px] xl:h-[120px]"
                  >
                    <h2 className="font-clashMedium text-[16px] font-[500]">
                      {eachData.title}
                    </h2>
                    <p className="font-satoshi text-[12px]">
                      {eachData.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <MobileWhatSetUsApart />
      </div>
    </div>
  );
};

export default WhatSetUsApart;
