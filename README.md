<ReactPageScroller
containerHeight="100vh"
// containerWidth={window.innerWidth}
renderAllPagesOnFirstRender={true}
onBeforePageScroll={(nextPageIndex) => {
setCurrentPage(nextPageIndex);
}}
pageOnChange={(page) => setCurrentPage(page)}
transitionTimingFunction="cubic-bezier(0.95, 0.05, 0.08, 1.01)"
animationTimer={1000}
blockScrollUp={isSubmitted}
blockScrollDown={isSubmitted}
customPageNumber={currentPage} >
<Screen
transitionStyle="w-full flex justify-center items-center"
submitButton={<SubmitButton />}
question={
<div className="">
{/_ <span className="text-2xl text-gray-400">{banglaIndex[0]}.</span>{" "} _/}
<span>{questions[0]}</span>
</div>
}
questionField={
<>
<Checkbox checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
</>
}
/>

        <Screen
          transitionStyle="w-full flex justify-center items-center"
          submitButton={<SubmitButton />}
          question={
            <div className="text-center">
              {/* <span className="text-2xl text-gray-400">{banglaIndex[1]}.</span> */}
              <span>{questions[1]}</span>
            </div>
          }
          questionField={
            <>
              <Checkbox checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
            </>
          }
        />

        <Screen
          submitButton={<SubmitButton />}
          transitionStyle="w-full"
          style="w-full"
          question={
            <div className="text-center text-gray-900 ">
              {/* <span className="text-2xl text-gray-400">{banglaIndex[2]}.</span> */}
              <span>{questions[2]}</span>
            </div>
          }
          questionField={
            <div className="flex flex-col items-center justify-center">
              <RadioButton selected={selected} setSelected={setSelected} />
            </div>
          }
        />

        <Screen
          transitionStyle="w-full flex justify-center items-center"
          question={<div className="text-center text-gray-900">Summary</div>}
          questionField={
            <div className="flex flex-col items-start w-[91%] md:w-[592px] justify-center bg-white border border-gray-300 divide-y rounded-lg shadow-md p-7">
              {survey.map((item, index) => {
                const even = index % 2 !== 0;
                return (
                  <div
                    key={index}
                    className={`flex flex-row justify-center align-center space-x-2 p-5`}
                  >
                    <div>
                      <div className="relative flex space-x-1 text-base sm:text-lg md:text-xl">
                        {/* <span className="font-extralight">Q:</span>{" "} */}
                        <p className="font-semibold">{item.question}</p>{" "}
                      </div>
                      <div className="flex mt-2 space-x-1 text-sm sm:text-base md:text-lg">
                        {/* <span className="font-extralight">A:</span>{" "} */}
                        <p className="font-semibold text-gray-500">
                          {item.answer}
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setCurrentPage(index);
                      }}
                      className="text-gray-400 transition-all ease-in-out cursor-pointer hover:text-black"
                    >
                      <EditIcon />
                    </div>
                  </div>
                );
              })}
            </div>
          }
          submitButton={<SubmitButton />}
        />
        {isSubmitted && (
          <Screen
            question={
              <div className="space-y-6">
                <div className="text-6xl text-center">🎉</div>
                <div className="text-center text-gray-900">
                  Thank you for your time!
                </div>
              </div>
            }
            questionField={
              <div className="flex flex-col items-start justify-center border border-gray-300 divide-y rounded-lg shadow-md p-7">
                Your answer has been submitted! You can safely close this window
                now.
              </div>
            }
            // submitButton={<SubmitButton />}
          />
        )}
      </ReactPageScroller>
