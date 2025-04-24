import Link from "next/link";

/* eslint-disable react/no-unescaped-entities */
export default function TermsAndConditionPage() {
  return (
    <div className="  p-6 bg-[#EBE9F4]">
      <div className=" font-manrope  text-[#190E3F] max-w-3xl mx-auto mt-14 p-2 md:p-6">
        <h1 className="text-3xl font-bold  mb-4">Oloja Hub Terms and Conditions</h1>

        <p className="mb-3">Effective Date: April 23, 2025</p>

        <p className="mb-3">Welcome to Oloja Hub!</p>

        <p className="mb-6">
          These Terms and Conditions ("Agreement") govern your use of our platform, including our website {" "}
          <Link href="http://www.oloja.com.au" target="_blank" className="underline text-blue-500">www.oloja.com.au</Link>, mobile applications, and associated services (together, the "Services"). By accessing or
          using the Services, you agree to be bound by this Agreement. If you do not agree to the terms, do not use the
          Services.
        </p>

        <div className="space-y-6">
          <div>
            <p className="font-bold text-xl ">1. Definitions</p>
            <p className="mt-1">In this Agreement:</p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>
                <p>"Oloja" "Oloja Hub", "we", "us", or "our" refers to the platform provider, Jacinth Solutions.</p>
              </li>
              <li>
                <p>"User", "you", or "your" refers to any individual or entity accessing or using the Services.</p>
              </li>
              <li>
                <p>"Service Provider" refers to users offering services through Oloja Hub.</p>
              </li>
              <li>
                <p>"Client" refers to users seeking or hiring services via Oloja Hub.</p>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-xl ">2. Acceptance of Terms</p>
            <p className="mt-1">
              By accessing and using the Services, you acknowledge and agree to these Terms and Conditions, as well as
              our Privacy Policy, which governs our collection and use of your personal information.
            </p>
            <p className="mt-2">
              We reserve the right to update or change these Terms at any time. Changes will be posted on this page, and
              the revised Terms will be effective immediately upon posting. Please review these Terms periodically to
              stay informed of any changes.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">3. SCOPE OF OLOJA HUB SERVICES</p>
            <p className="mt-1">
              3.1 Oloja Hub provides an online platform to connect Service Providers ("Providers") with Clients who
              require services ("Clients").
            </p>
            <p className="mt-1">
              3.2 Providers can offer services by responding to posted tasks by Clients. Certain information, such as
              service details and offers, may be made publicly available.
            </p>
            <p className="mt-1">
              3.3 Clients may cancel or modify posted tasks at any time before accepting a Provider's offer. Oloja Hub
              reserves the right to cancel offers made prior to the task modification.
            </p>
            <p className="mt-1">
              3.4 Upon accepting a Provider's offer, a task contract is created between the Client and the Provider
              ("Task Contract").
            </p>
            <p className="mt-1">
              3.5 The Client is required to pay the agreed amount for the task into a secure payment account upon
              creation of the Task Contract.
            </p>
            <p className="mt-1">
              3.6 Oloja Hub charges a service fee ("Service Fee") for facilitating the connection and transaction.
            </p>
            <p className="mt-1">
              3.7 Once the task is completed, the Client will be notified and must confirm task completion or dispute
              within 10 days. If no response is received, the task will be automatically marked as completed, and
              payment will be released to the Provider.
            </p>
            <p className="mt-1">3.8 After task completion confirmation, the Provider's service fee will be paid.</p>
            <p className="mt-1">
              3.9 Providers and Clients are encouraged to leave feedback on each other's services via the platform.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">4. OLOJA HUB'S ROLE AND OBLIGATIONS</p>
            <p className="mt-1">
              4.1 Oloja Hub operates as a platform facilitating connections between Clients and Providers but does not
              directly perform the services listed.
            </p>
            <p className="mt-1">4.2 Only individuals aged 18 or older are allowed to use the platform.</p>
            <p className="mt-1">
              4.3 Oloja Hub may suspend or remove any account that violates these Terms, engages in fraudulent behavior,
              or breaches applicable laws.
            </p>
            <p className="mt-1">
              4.4 Oloja Hub does not verify or guarantee the truthfulness, accuracy, or performance of any task posted
              or completed via the platform. Clients and Providers are responsible for performing their due diligence.
            </p>
            <p className="mt-1">
              4.5 Oloja Hub is not liable for any disputes or interactions between Clients and Providers.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">5. USER OBLIGATIONS</p>
            <p className="mt-1">5.1 Users must:</p>
            <ul className="list-disc pl-8 space-y-2 mt-2">
              <li>
                <p>Comply with these Terms and all applicable laws.</p>
              </li>
              <li>
                <p>Ensure accuracy when posting tasks or offers.</p>
              </li>
              <li>
                <p>Maintain control over their account and not allow others to use it.</p>
              </li>
            </ul>
            <p className="mt-2">
              5.2 Users agree that content uploaded to Oloja Hub cannot be used for third-party commercial purposes
              without prior written consent.
            </p>
            <p className="mt-1">
              5.3 Users must not engage in illegal, harmful, or unethical activities while using the platform.
            </p>
            <p className="mt-1">
              5.4 Users grant Oloja Hub a license to use and modify content uploaded to the platform for the purpose of
              providing services and promoting the platform.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">6. FEES</p>
            <p className="mt-1">
              6.1 Oloja Hub charges a service fee for connecting Clients with Providers. This fee is deducted from the
              payment made for each task.
            </p>
            <p className="mt-1">6.2 Fees for Oloja Hub services are inclusive of any applicable taxes.</p>
            <p className="mt-1">
              6.3 The Oloja Hub platform reserves the right to adjust fees at any time, with updates posted on the
              website.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">7. PAYMENTS, REFUNDS, AND CANCELLATIONS</p>
            <p className="mt-1">
              7.1 If a task contract is canceled before services begin, the Client may be refunded via Oloja Hub credits
              or the original payment method, depending on the situation.
            </p>
            <p className="mt-1">
              7.2 Cancellations after service completion will be subject to specific terms based on the circumstances.
            </p>
            <p className="mt-1">
              7.3 Oloja Hub may charge a cancellation fee if the cancellation is initiated by either the Client or
              Provider.
            </p>
            <p className="mt-1">
              7.4 Refunds will be processed within 5-7 business days, depending on the nature of the task and the
              payment method used.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">8. THIRD PARTY PAYMENTS AND PROCESSING</p>
            <p className="mt-1">
              8.1 Payments are processed via a third-party provider, and Oloja Hub does not store or handle sensitive
              payment information.
            </p>
            <p className="mt-1">
              8.2 The third-party payment provider's terms and conditions will apply, and Users must agree to those
              terms prior to making payments on the platform.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">9. VERIFICATION & BADGES</p>
            <p className="mt-1">
              9.1 Oloja Hub may offer optional badges or verification features, but Oloja Hub does not guarantee the
              authenticity or reliability of these badges.
            </p>
            <p className="mt-1">
              9.2 Providers and Clients are encouraged to perform their own checks and ensure the qualifications and
              credibility of the other party before entering into a task agreement.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">10. LIMITATION OF LIABILITY</p>
            <p className="mt-1">
              10.1 To the maximum extent permitted by law, Oloja Hub is not liable for any indirect, incidental,
              special, or consequential damages related to tasks performed via the platform.
            </p>
            <p className="mt-1">
              10.2 The total liability of Oloja Hub for any claims arising from the use of the Services will not exceed
              the total amount paid for the specific task giving rise to the claim.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">11. DISPUTES AND MEDIATION</p>
            <p className="mt-1">
              11.1 Users should attempt to resolve disputes directly. If a resolution is not possible, Oloja Hub may
              assist in mediating the dispute.
            </p>
            <p className="mt-1">11.2 Oloja Hub may choose to withhold any payments until disputes are resolved.</p>
            <p className="mt-1">
              11.3 Oloja Hub may provide access to third-party dispute resolution services at its discretion.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">12. TERM AND TERMINATION</p>
            <p className="mt-1">
              12.1 Oloja Hub reserves the right to terminate accounts or restrict access to the platform at its
              discretion.
            </p>
            <p className="mt-1">
              12.2 Either party may terminate the agreement at any time, but all Task Contracts that have been formed
              prior to termination will remain in effect.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">13. PRIVACY AND DATA SECURITY</p>
            <p className="mt-1">13.1 Oloja Hub collects personal data in accordance with our Privacy Policy.</p>
            <p className="mt-1">
              13.2 Users must update their personal information if it changes, including contact details, and ensure
              that information is accurate and up to date.
            </p>
            <p className="mt-1">
              13.3 By using the platform, users consent to Oloja Hub collecting and processing their personal data as
              described in the Privacy Policy.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">14. MODIFICATIONS</p>
            <p className="mt-1">
              14.1 Oloja Hub reserves the right to modify or update these Terms at any time. Changes will be posted on
              the platform, and your continued use of the platform after changes are made signifies your acceptance of
              those changes.
            </p>
          </div>

          <div>
            <p className="font-bold text-xl ">15. GOVERNING LAW</p>
            <p className="mt-1">
              15.1 These Terms are governed by the laws of Queensland, Australia. Any disputes will be subject to the
              jurisdiction of the courts in Queensland.
            </p>
          </div>

          <div>
            <p>
              <span className="font-bold uppercase text-xl">16. Contact Information</span> 
            </p>
            <p> If you have any questions or concerns about
              these T&C, you can contact us at:</p>
            <p className="mt-1">Oloja Hub Operations</p>
            <p>Email:<Link href="mailto:operations@jacinthsolutions.com.au">
              operations@jacinthsolutions.com.au
            </Link></p>
            <p>Location: Queensland, Australia</p>
          </div>
        </div>
      </div>
    </div>

  )
}




