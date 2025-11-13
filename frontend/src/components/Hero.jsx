import { ArrowRight, Zap } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { getData } from '@/context/userContext'

const Hero = () => {
  const { user } = getData()
  const navigate = useNavigate()

  return (
    <div className="relative w-full md:h-[700px] h-screen bg-green-50 overflow-hidden">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center space-y-4 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {user && (
              <motion.h1
                className="font-bold text-2xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome {user.username}
              </motion.h1>
            )}

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Badge variant="secondary" className="mb-4 text-green-800 border border-green-200">
                  <Zap className="w-3 h-3 mr-1" />
                  Empowering your next move — from job search to success.
                </Badge>
              </motion.div>

              <motion.h1
                className="text-green-600 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Your career journey starts here — discover
                <span className="text-gray-800"> jobs </span>
                and <span className="text-gray-800"> unlock</span> opportunities.

              </motion.h1>

              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Built to connect you with meaningful work, faster.
                Find roles that match your skills, goals, and lifestyle.
              </motion.p>
            </motion.div>

            <motion.div
              className="space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button
                  onClick={() => navigate('/create-todo')}
                  size="lg"
                  className="h-12 px-8 relative bg-green-600 hover:bg-green-500"
                >
                  Find Your Next Role
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button variant="outline" size="lg" className="h-12 px-8 bg-white text-green-800">
                  Explore Career Tools
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-sm text-green-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Free forever • No credit card required • 2 minutes setup
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Hero;
