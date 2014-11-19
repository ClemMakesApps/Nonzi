(defproject
  multiplyme
  "0.1.0-SNAPSHOT"
  :description
  "FIXME: write description"
  :url
  "http://example.com/FIXME"
  :dependencies
  [[ring-server "0.3.1"]
   [noir-exception "0.2.2"]
   [environ "1.0.0"]
   [ragtime "0.3.6"]
   [com.taoensso/timbre "3.3.1"]
   [markdown-clj "0.9.55" :exclusions [com.keminglabs/cljx]]
   [org.clojure/clojure "1.6.0"]
   [selmer "0.7.2"]
   [prone "0.6.0"]
   [com.taoensso/tower "3.0.2"]
   [log4j
    "1.2.17"
    :exclusions
    [javax.mail/mail
     javax.jms/jms
     com.sun.jdmk/jmxtools
     com.sun.jmx/jmxri]]
   [korma "0.4.0"]
   [im.chit/cronj "1.4.2"]
   [lib-noir "0.9.4"]
   [org.postgresql/postgresql "9.3-1102-jdbc4"]]
  :repl-options
  {:init-ns multiplyme.repl}
  :jvm-opts
  ["-server"]
  :plugins
  [[lein-ring "0.8.13"]
   [lein-environ "1.0.0"]
   [lein-ancient "0.5.5"]
   [ragtime/ragtime.lein "0.3.6"]]
  :ring
  {:handler multiplyme.handler/app,
   :init multiplyme.handler/init,
   :destroy multiplyme.handler/destroy}
  :profiles
  {:uberjar {:omit-source true, :env {:production true}, :aot :all},
   :production
   {:ring
    {:open-browser? false, :stacktraces? false, :auto-reload? false}},
   :dev
   {:dependencies
    [[ring-mock "0.1.5"]
     [ring/ring-devel "1.3.1"]
     [pjstadig/humane-test-output "0.6.0"]],
    :injections
    [(require 'pjstadig.humane-test-output)
     (pjstadig.humane-test-output/activate!)],
    :env {:dev true}}}
  :ragtime
  {:migrations ragtime.sql.files/migrations,
   :database
   "jdbc:postgresql://localhost/multiplyme?user=Fraser&password="}
  :min-lein-version "2.0.0")
