import Link from "next/link";

/* eslint-disable react/no-unescaped-entities */
export default function PrivacyPage() {
  return (
    <div className=" p-6 ">
      <div className=" font-manrope   max-w-3xl mx-auto mt-14 p-2 md:p-6">
        <h1 className="text-xl font-bold  mb-4"><span className="font-bold">Oloja Hub</span> Privacy Policy</h1>

        <p className="mb-3">Effective Date: April 23, 2025</p>

        <p className="mb-4">
          <span className="font-bold">Oloja Hub</span> manages the information that we collect from you in accordance with applicable privacy legislation.
          This Privacy Policy explains how <span className="font-bold">Oloja Hub</span> collects, uses, shares, and handles your personal data and sets out
          the rights and obligations of both you and <span className="font-bold">Oloja Hub</span> in relation to your personal data.
        </p>

        <p className="mb-6">
          By accessing   <Link href="http://www.oloja.com.au" target="_blank" className="underline text-blue-500">www.oloja.com.au</Link> or using our mobile applications (together, the "Services"), you accept and
          agree to the <Link href={"/terms-and-condition"} className="underline text-blue-500">Terms and Conditions</Link> of <span className="font-bold">Oloja Hub's</span> User Agreement ("User Agreement") and acknowledge that your
          personal data may be collected, used, and disclosed in accordance with this Privacy Policy. If you do not
          agree with the terms of this Privacy Policy, please do not use the Services.
        </p>

        <div className="space-y-6">
          <div>
            <p className="font-bold">1. Collection of Your Personal Data</p>
            <p className="font-bold mt-2">Information We Collect Directly from You</p>
            <p className="mt-1">
              <span className="font-bold"> Oloja Hub</span> collects personal data when you register with us, submit a task, or engage with other services.
              This includes:
            </p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>
                <p>
                  <span className="font-bold">Personal Identification Information:</span> Full name, email address,
                  phone number, and location.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Account Information:</span> Details such as occupation, work experience,
                  qualifications, and other information relevant for your profile.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Transaction Data:</span> Credit card information, payment processing
                  details, and purchase history (processed via third-party providers).
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Profile Information:</span> Preferences, interests, and photos (if
                  uploaded) for your profile.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Communication Data:</span> Information from interactions such as
                  customer support requests or email correspondence.
                </p>
              </li>
            </ul>

            <p className="font-bold mt-4">Information We Collect Automatically</p>
            <p className="mt-1">We may automatically collect the following when you use the Services:</p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>
                <p>
                  <span className="font-bold ">Usage Information:</span> Including your IP address, device ID, browser
                  type, browsing history, page views, and other similar data.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold ">Geolocation Data:</span> When you use location-based services, such as
                  the location of your device via GPS or other methods.
                </p>
              </li>
            </ul>

            <p className="font-bold  mt-4">Information from Third Parties</p>
            <p className="mt-1">
              We may collect data from third-party verification services, marketing partners, or other users. This can
              include publicly available information such as references or social media profiles.
            </p>
          </div>

          <div>
            <p className="font-bold">2. How We Use Your Personal Data</p>
            <p className="mt-1"><span className="font-bold">Oloja Hub</span> uses your personal data for the following purposes:</p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>
                <p>
                  <span className="font-bold">To Provide Services:</span> To facilitate account registration, enable
                  task posting, process payments, and deliver other related services.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">To Improve the Services:</span> To enhance user experience, develop new
                  features, and analyze usage patterns.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">To Communicate with You:</span> To send notifications about tasks,
                  promotions, updates, and relevant content.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">To Ensure Security:</span> To monitor and protect our platform from
                  fraud, unauthorized access, or misuse.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">For Legal and Regulatory Compliance:</span> To comply with applicable
                  laws, regulations, or legal obligations.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold">3. How We Share Your Personal Data</p>
            <p className="mt-1">We do not sell your personal data. However, we may share your personal data with:</p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>
                <p>
                  <span className="font-bold">Service Providers:</span> Third-party partners who assist in processing
                  payments, providing customer support, or other services essential to operating the platform.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">With Other Users:</span> For example, if you post a task or interact
                  with service providers, your profile and task details may be shared with relevant users.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Legal Requirements:</span> If required by law or in response to lawful
                  requests by public authorities, including to meet national security or law enforcement requirements.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Business Transactions:</span> If <span className="font-bold">Oloja Hub</span> is involved in a merger,
                  acquisition, or sale of assets, your personal data may be transferred as part of the transaction.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold">4. Payment Information</p>
            <p className="mt-1">
              <span className="font-bold"> Oloja Hub</span> does <span className="font-bold">not</span> directly process payments or store sensitive financial information such as bank
              accounts or credit card details. All payment transactions are processed securely through a <span className="font-bold">third-party
                payment system provider</span>. By using our Services, you acknowledge and agree that your payment information,
              including credit card or bank details, will be collected, stored, and processed by our trusted third-party
              payment provider in accordance with their privacy and security policies. We do not store or have access to
              your financial details, and any payment-related data is handled by the third-party provider under their
              terms and conditions.
            </p>
          </div>

          <div>
            <p className="font-bold">5. Security of Your Personal Data</p>
            <p className="mt-1">
              We implement reasonable security measures to protect your personal data. However, no data transmission
              over the Internet can be guaranteed to be completely secure. You acknowledge that you provide your
              personal data at your own risk. We encourage you to use strong, unique passwords and take steps to protect
              your account information.
            </p>
          </div>

          <div>
            <p className="font-bold">6. Cookies and Similar Technologies</p>
            <p className="mt-1"><span className="font-bold">Oloja Hub</span> uses cookies and similar tracking technologies for various purposes:</p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>
                <p>
                  <span className="font-bold">Essential Cookies:</span> For logging in, session management, and
                  ensuring website functionality.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Performance and Analytics:</span> To analyze how you interact with our
                  Services and improve the user experience.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Advertising and Marketing:</span> To provide personalized content and
                  ads.
                </p>
              </li>
            </ul>
            <p className="mt-2">
              You can manage your cookie preferences through your browser settings. Please note that some parts of the
              Services may not work as expected if you disable cookies.
            </p>
          </div>

          <div>
            <p className="font-bold">7. Your Rights and Choices</p>
            <p className="mt-1">As a user, you have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>
                <p>
                  <span className="font-bold">Access and Correction:</span> You can request access to your personal
                  data and ask for corrections if the data is inaccurate or incomplete.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Deletion:</span> You can request the deletion of your data, subject to
                  certain legal restrictions.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Opting Out of Marketing:</span> You can opt out of receiving marketing
                  emails or notifications at any time by following the unsubscribe instructions or by contacting us
                  directly.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Data Portability:</span> You can request your personal data in a
                  portable format.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Withdrawing Consent:</span> If we process data based on your consent,
                  you can withdraw that consent at any time.
                </p>
              </li>
            </ul>
            <p className="mt-2">To exercise these rights, please contact us at  <Link className="underline font-bold text-blue-500" href="mailto:operations@jacinthsolutions.com.au">
              operations@jacinthsolutions.com.au
            </Link> </p>
          </div>

          <div>
            <p className="font-bold">8. What Other Information Users Can See About You</p>
            <p className="mt-1">
              You are <span className="font-bold">not anonymous</span> to us when you log into the Services or post any content (including tasks, items to
              be supplied, bids, comments, or feedback) on the Services or any associated forum.
            </p>
            <p className="mt-2">When you:</p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>
                <p>
                  Use the Services to post a task or item to be supplied, or make a bid, or comment on a bid, or provide
                  feedback on other users; or
                </p>
              </li>
              <li>
                <p>Otherwise communicate in a public forum on the Services,</p>
              </li>
            </ul>
            <p className="mt-2">
              Your <span className="font-bold">user ID</span> and all the material that you post is visible and searchable to us, other <span className="font-bold">Oloja Hub</span> users,
              and is also publicly available to other internet users. We strongly encourage you to use caution and
              discretion when posting and carefully consider whether and what to post or how you identify yourself on
              the Services.
            </p>
            <p className="mt-2">
              <span className="font-bold"> Oloja Hub</span> does not in any way control, and does not accept any responsibility or liability whatsoever for,
              the disclosure or use of personal data which is voluntarily posted by you in a publicly accessible area of
              the Services.
            </p>
          </div>

          <div>
            <p className="font-bold">9. Retention of Your Personal Data</p>
            <p className="mt-1">
              We retain your personal data for as long as necessary to provide the Services and fulfill the purposes
              outlined in this Privacy Policy, or for as long as required by applicable law. When we no longer need your
              personal data, we will take steps to securely delete or anonymize it.
            </p>
          </div>

          <div>
            <p className="font-bold">10. Changes to Your Personal Information</p>
            <p className="mt-1">
              You are responsible for ensuring that the personal information you provide to us is accurate and
              up-to-date. If any of your personal details change (e.g., name, email address, phone number), you have a
              duty to update your account promptly. This ensures that the information we maintain about you is complete
              and accurate.
            </p>
          </div>

          <div>
            <p className="font-bold">11. Children's Privacy</p>
            <p className="mt-1">
              Our Services are not intended for children under 18 years of age. We do not knowingly collect personal
              data from children. If you believe we have inadvertently collected information from a child, please
              contact us immediately, and we will take steps to delete that information.
            </p>
          </div>
          <div>
            <p>
              <span className="font-bold ">12. Contact Information</span> 
            </p>
            <p> If you have any questions or concerns about
              privacy, you can contact us at:</p>
            <p className="mt-1 font-bold">Oloja Hub Operations</p>
            <p>Email: <Link className="underline text-blue-500" href="mailto:operations@jacinthsolutions.com.au">
              operations@jacinthsolutions.com.au
            </Link></p>
            <p>Location: Queensland, Australia</p>
          </div>
          <div>
            <p className="font-bold">Appendix A: Terms</p>
            <p className=" mt-2">Australian Privacy Terms</p>
            <p className="mt-1">
              This Privacy Policy is also governed by the Privacy Act 1988 (Cth). If you wish to access, correct, or
              delete your personal data, you can do so by contacting us directly. If you have concerns, you may lodge a
              complaint with the <span className="font-bold">Office of the Australian Information Commissioner (OAIC).</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
