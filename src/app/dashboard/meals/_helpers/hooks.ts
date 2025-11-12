import { useQuery } from "@tanstack/react-query"
import { getAllMeals } from "./actions"

import { MealState } from "@/types"
import { QueryKeys } from "@/lib/query-keys"

export function useMeals(search?: string, state?: MealState) {
  const query = useQuery({
    queryKey: QueryKeys.meals(search, state),
    queryFn: ({ queryKey }) => getAllMeals(queryKey[1], queryKey[2] as MealState)
  })

  return {
    meals: query.data,
    modifiedMeals: query.data?.map((meal) => ({
      label: meal.meal_type,
      id: meal.id
    })),
    isMealsLoading: query.isLoading,
    isMealsError: query.isError,
    isMealsRefetching: query.isRefetching,
    refetchMeals: query.refetch
  }
}
