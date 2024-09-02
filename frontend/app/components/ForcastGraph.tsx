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
import { useMutation, useQuery } from '@tanstack/react-query'
import { estimateRevenue, getAffiliate } from '~/apis'
import { AffiliateDto } from '~/types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux/store'
import { setEstimateRevenue } from '~/redux/slice/revenue-graph-slice'

const ForcastGraph = () => {
  const [totalReferMonthly, setReferTotalMonthly] = React.useState<number>(1)
  const [avgNewProject, setAvgNewProjectMonthly] = React.useState<number>(5)
  const [avgExistingProjects, setAverageExistingProjects] = React.useState<number>(0)
  const [totalIncome, setTotalIncomePerMonth] = React.useState<number>(1)
  const dispatch = useDispatch<AppDispatch>()


  const { data: affiliate, isPending: isAffiliatePending, isSuccess: isAffilate } = useQuery({
    queryKey: ["affiliate"],
    queryFn: getAffiliate
  })

  const estimateMutate = useMutation({
    mutationKey: ["estimate", affiliate?.id],
    mutationFn: estimateRevenue
  })

  const estimateResponse = async (affiliate: AffiliateDto) => {
    estimateMutate.mutate(
      { affiliate, affiliatePayout: 0.2, monthlyFee: 0.25, pricePerProject: 95 },
      {
        onSuccess: (data) => {
          dispatch(setEstimateRevenue(data))
          setTotalIncomePerMonth(data[11].revenue)
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  }
  React.useEffect(() => {
    if (isAffilate) {
      setReferTotalMonthly(affiliate.monthlyRefferals)
      setAvgNewProjectMonthly(affiliate.averageNewProjectPerMonth)
      setAverageExistingProjects(affiliate.existingProjectPerMonth)
      estimateResponse(affiliate)
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
          {isAffiliatePending ? <div className='text-center'>
            <div className="flex items-center justify-center w-56 h-56 ">
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div> :
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
                  <Slider onValueChange={handleChangeReferTotal} value={[totalReferMonthly]} max={10} min={1} step={1} />
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
            {isAffiliatePending ?
              <div className='text-center'>
                <div className="flex items-center justify-center w-56 h-56 ">
                  <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
              :
              <BarChart />}
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