import React from 'react'
import { Slider } from './ui/slider'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import ToolTipIcon from "./icons/ToolTip"
import BarChart from './BarChart'
import { useQuery } from '@tanstack/react-query'
import { getAffiliate } from '~/apis'

const ForcastGraph = () => {
  const [totalReferMonthly, setReferTotalMonthly] = React.useState<number>(1)
  const [avgNewProject, setAvgNewProjectMonthly] = React.useState<number>(5)
  const [avgExistingProjects, setAverageExistingProjects] = React.useState<number>(0)
  const [totalIncome, setTotalIncomePerMonth] = React.useState<number>(1)


  const { data: affiliate, isPending:isAffiliatePending, isSuccess: isAffilate } = useQuery({
    queryKey: ["affiliate"],
    queryFn: getAffiliate
  })

  

  React.useEffect(() => {
    if (isAffilate) {
      console.log(affiliate)
      setReferTotalMonthly(affiliate.monthlyRefferals)
      setAvgNewProjectMonthly(affiliate.averageNewProjectPerMonth)
      setAverageExistingProjects(affiliate.existingProjectPerMonth)
    }
    
  }, [affiliate])
  const handleChangeReferTotal = (value: number[]) => {
    setReferTotalMonthly(value[0])
  }
  const handleChangeReferProject = (value: number[]) => {
    setAvgNewProjectMonthly(value[0])
  }
  const handleChangeExistingProjects = (value: number[]) => {
    setAverageExistingProjects(value[0])
  }
  return (
    <React.Fragment>
      <div className="p-2 md:p-10  flex flex-col space-y-4 ">
        <h2 className='text-center my-4 md:my-0 text-2xl lg:text-3xl font-semibold font-[Arial]'> Calculate Your Recurring
          <br />
          Passive Income</h2>
        <div className="flex flex-col md:flex-row space-y-5  md:space-x-10  ">
          {isAffiliatePending? <div className='text-center'>Loading...</div>:
          <div className='px-10 md:px-0 my-4 md:my-0 md:w-1/4'>
            <div className="flex flex-col space-y-4">
              <div>
                <p>
                  Add in your expected referals and see how much you could earn as a
                  <span className='mx-1 font-bold'>
                    Sunvoy Affiliate
                  </span>
                  in just 1 year
                </p>
              </div>
              <div className='flex flex-col space-y-3'>
                <div className=' text-gray-500  tracking-wide font-medium    flex justify-between items-center'>
                  <div>
                    Reffered Increased Per Month
                  </div>
                  <div>
                    {totalReferMonthly}
                  </div>

                </div>
                <Slider onValueChange={handleChangeReferTotal} value={[totalReferMonthly]}  max={10} min={1} step={1} />
              </div>
              <div className='flex flex-col space-y-3'>
                <div className=' text-gray-500  tracking-wide font-medium    flex justify-between items-center'>
                  <div className='flex space-x-2 items-center'>
                    <div>
                      Average New Project Per Month
                    </div>
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <ToolTipIcon width={15} height={15} fill={"#000"} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>A number between 5 and 50</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div>
                    {avgNewProject}
                  </div>

                </div>
                <Slider onValueChange={handleChangeReferProject} value={[avgNewProject]} max={50} min={5} step={1} />
              </div>
              <div className='flex flex-col space-y-3'>
                <div className=' text-gray-500  tracking-wide font-medium    flex justify-between items-center'>
                  <div className='flex space-x-2 items-center'>
                    <div>
                      Average existing projects
                    </div>
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <ToolTipIcon width={15} height={15} fill={"#000"} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>A number between 0 and 10,000</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div>
                    {avgExistingProjects}
                  </div>
                </div>
                <Slider onValueChange={handleChangeExistingProjects} value={[avgExistingProjects]} max={10000} min={0} step={1} />
              </div>
            </div>
            <div className='flex flex-col my-10 space-y-4'>
              <div className='flex flex-col   md:flex-row  space-x-2 items-center'>
                <div >
                  Your
                  <span className='mx-1 font-bold'>
                    monthly income
                  </span>
                  after 1 year
                </div>

              </div>
              <div className='flex text-3xl md:text-5xl md:-ml-10 text-gray-800 font-bold justify-center'>
                ${totalIncome.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </div>
            </div>
          </div>
          }
          <div className='md:w-3/4 '>
            <BarChart />
          </div>
        </div>
        <div className=' text-gray-500 text-center my-8 md:w-8/12 md:mx-auto'>
          Calculations are based on the number of customers you refer each month and their avg, project, volume. Factor in our churn rate and this brings you to your monthly estimated total passive futture income.
        </div>
      </div>
    </React.Fragment>
  )
}

export default ForcastGraph